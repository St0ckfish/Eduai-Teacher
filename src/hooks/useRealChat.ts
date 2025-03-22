import { type Client as StompClient, type IMessage, Client } from "@stomp/stompjs";
import { useEffect, useRef, useState, useCallback } from "react";
import Cookies from "js-cookie";

// تعريف الأنواع
interface Attachment {
  id: string;
  viewLink: string;
  downloadLink: string;
  isVideo: boolean;
  isAudio: boolean;
  isFile: boolean;
  isImage: boolean;
}

interface Message {
  chatId: number | string;
  id: number | string;
  content: string;
  creationTime: string;
  creatorName: string;
  imageUrl?: string;
  hasAttachment?: boolean;
  attachment?: Attachment;
}

interface UseWebSocketChatProps {
  userId: string | null;
  initialMessages: Message[];
  onNewMessage?: () => void;
}

interface MessagePayload {
  chatId: string | number;
  content: string;
  imageUrl?: string;
}

interface FileMessagePayload extends MessagePayload {
  file?: File;
}

// دالة مساعدة لتحويل المعرفات إلى سلاسل نصية بشكل آمن
const safeStringify = (id: string | number | null | undefined): string => {
  return id != null ? String(id) : '';
};

// Singleton لإدارة اتصال WebSocket
class WebSocketManager {
  private static instance: WebSocketManager | null = null;
  private client: StompClient | null = null;
  private isConnecting = false;
  private subscriptions = new Map<string, any>();
  private listeners = new Map<string, Set<(message: Message) => void>>();
  private connectionListeners = new Set<(connected: boolean) => void>();
  
  // الحصول على رمز التوثيق
  private getToken(): string | null {
    return Cookies.get("token") || null;
  }
  
  // الحصول على نسخة واحدة من المدير
  public static getInstance(): WebSocketManager {
    if (!WebSocketManager.instance) {
      WebSocketManager.instance = new WebSocketManager();
    }
    return WebSocketManager.instance;
  }
  
  // إنشاء اتصال WebSocket
  public connect(): void {
    if (this.client?.connected || this.isConnecting) {
      return;
    }
    
    const token = this.getToken();
    if (!token) {
      console.error("لا يمكن الاتصال: الرمز غير موجود");
      return;
    }
    
    this.isConnecting = true;
    console.log("إنشاء اتصال WebSocket جديد");
    
    // إغلاق أي اتصال سابق
    this.disconnect();
    
    try {
      this.client = new Client({
        brokerURL: `wss://api.eduai.tech/ws?token=${token}`,
        debug: (msg) => console.log("[STOMP Debug]", msg),
        reconnectDelay: 0, // إيقاف إعادة المحاولة التلقائية
        heartbeatIncoming: 10000,
        heartbeatOutgoing: 10000,
      });
      
      this.client.onConnect = () => {
        console.log("✅ تم الاتصال بـ WebSocket بنجاح");
        this.isConnecting = false;
        this.notifyConnectionChange(true);
        this.resubscribeAll();
      };
      
      this.client.onStompError = (frame) => {
        console.error("خطأ STOMP:", frame.headers.message);
        this.isConnecting = false;
        this.notifyConnectionChange(false);
      };
      
      this.client.onWebSocketError = (event) => {
        console.error("خطأ WebSocket:", event);
        this.isConnecting = false;
        this.notifyConnectionChange(false);
      };
      
      this.client.onWebSocketClose = () => {
        console.log("تم إغلاق اتصال WebSocket");
        this.isConnecting = false;
        this.notifyConnectionChange(false);
      };
      
      this.client.activate();
    } catch (error) {
      console.error("خطأ في إنشاء اتصال:", error);
      this.isConnecting = false;
      this.client = null;
      this.notifyConnectionChange(false);
    }
  }
  
  // قطع الاتصال
  public disconnect(): void {
    if (this.client) {
      try {
        this.client.deactivate();
      } catch (error) {
        console.error("خطأ في قطع الاتصال:", error);
      }
      this.client = null;
      this.notifyConnectionChange(false);
    }
  }
  
  // الاشتراك في تغيرات حالة الاتصال
  public onConnectionChange(callback: (connected: boolean) => void): () => void {
    this.connectionListeners.add(callback);
    callback(this.isConnected());
    
    return () => {
      this.connectionListeners.delete(callback);
    };
  }
  
  // الإشعار بتغيير حالة الاتصال
  private notifyConnectionChange(connected: boolean): void {
    this.connectionListeners.forEach(listener => {
      try {
        listener(connected);
      } catch (error) {
        console.error("خطأ في معالج تغيير الاتصال:", error);
      }
    });
  }
  
  // التحقق من حالة الاتصال
  public isConnected(): boolean {
    return !!this.client?.connected;
  }
  
  // الاشتراك في قناة المستخدم
  public subscribeToUser(
    userId: string, 
    onMessage: (message: Message) => void
  ): () => void {
    // إضافة المستمع
    if (!this.listeners.has(userId)) {
      this.listeners.set(userId, new Set());
    }
    
    this.listeners.get(userId)!.add(onMessage);
    
    // إنشاء الاشتراك إذا لم يكن موجوداً
    this.ensureSubscription(userId);
    
    // إرجاع دالة لإلغاء الاشتراك
    return () => {
      if (this.listeners.has(userId)) {
        const userListeners = this.listeners.get(userId)!;
        userListeners.delete(onMessage);
        
        // إلغاء الاشتراك إذا لم يعد هناك مستمعون
        if (userListeners.size === 0) {
          this.unsubscribeFromUser(userId);
        }
      }
    };
  }
  
  // إلغاء الاشتراك من قناة المستخدم
  private unsubscribeFromUser(userId: string): void {
    if (this.subscriptions.has(userId) && this.client?.connected) {
      try {
        const subscription = this.subscriptions.get(userId);
        subscription.unsubscribe();
        this.subscriptions.delete(userId);
        console.log(`تم إلغاء الاشتراك من قناة المستخدم ${userId}`);
      } catch (error) {
        console.error(`خطأ في إلغاء الاشتراك من المستخدم ${userId}:`, error);
      }
    }
    
    this.listeners.delete(userId);
  }
  
  // التأكد من وجود اشتراك للمستخدم
  private ensureSubscription(userId: string): void {
    // إنشاء اتصال إذا لم يكن موجوداً
    if (!this.isConnected()) {
      this.connect();
      return; // الاشتراك سيتم عند اكتمال الاتصال
    }
    
    // إنشاء اشتراك جديد إذا لم يكن موجوداً
    if (!this.subscriptions.has(userId) && this.client?.connected) {
      try {
        const subscriptionPath = `/direct-chat/${userId}`;
        console.log(`الاشتراك في: ${subscriptionPath}`);
        
        const subscription = this.client.subscribe(subscriptionPath, (message: IMessage) => {
          this.handleMessage(userId, message);
        });
        
        this.subscriptions.set(userId, subscription);
        console.log(`تم الاشتراك في قناة المستخدم ${userId} بنجاح`);
      } catch (error) {
        console.error(`خطأ في الاشتراك للمستخدم ${userId}:`, error);
      }
    }
  }
  
  // إعادة إنشاء جميع الاشتراكات
  private resubscribeAll(): void {
    // مسح الاشتراكات القديمة
    this.subscriptions.clear();
    
    // إعادة الاشتراك للمستخدمين النشطين
    this.listeners.forEach((_, userId) => {
      if (this.listeners.get(userId)!.size > 0) {
        this.ensureSubscription(userId);
      }
    });
  }
  
  // معالجة الرسائل الواردة
  private handleMessage(userId: string, message: IMessage): void {
    try {
      if (!message.body) {
        console.error("رسالة فارغة");
        return;
      }
      
      const newMessage: Message = JSON.parse(message.body);
      if (!newMessage || !newMessage.id) {
        console.error("تنسيق رسالة غير صالح");
        return;
      }
      
      console.log(`رسالة جديدة للمستخدم ${userId}:`, newMessage);
      
      // إرسال الرسالة لجميع المستمعين
      const userListeners = this.listeners.get(userId);
      if (userListeners) {
        userListeners.forEach(listener => {
          try {
            listener(newMessage);
          } catch (error) {
            console.error("خطأ في معالج الرسائل:", error);
          }
        });
      }
    } catch (error) {
      console.error("خطأ في معالجة الرسالة:", error);
    }
  }
  
  // إرسال رسالة عبر WebSocket
  public sendMessage(payload: MessagePayload): boolean {
    if (!this.client?.connected) {
      return false;
    }
    
    try {
      const normalizedPayload = {
        ...payload,
        chatId: String(payload.chatId)
      };
      
      // تجربة كلا وجهتي الرسائل المحتملتين
      const destination = '/app/chat.sendMessage';
      
      this.client.publish({
        destination,
        body: JSON.stringify(normalizedPayload),
        headers: { 'content-type': 'application/json' }
      });
      
      return true;
    } catch (error) {
      console.error("خطأ في إرسال الرسالة عبر WebSocket:", error);
      return false;
    }
  }
}

// رفع ملف واحد وإرسال رسالة عبر REST API
async function sendViaRest(payload: MessagePayload | FileMessagePayload): Promise<Message | null> {
  const token = Cookies.get("token");
  if (!token) {
    throw new Error("لا يوجد رمز توثيق");
  }
  
  try {
    let finalPayload: any = {
      ...payload,
      chatId: String(payload.chatId)
    };

    // رفع الملف إذا كان موجوداً
    if ('file' in payload && payload.file) {
      const filePayload = payload;
      const formData = new FormData();
      if (filePayload.file) {
        formData.append("file", filePayload.file);
      }
      
      const uploadUrl = `https://api.eduai.tech/api/v1/messages/${payload.chatId}/file`;
      const uploadResponse = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });
      
      if (!uploadResponse.ok) {
        throw new Error(`فشل رفع الملف: ${uploadResponse.status}`);
      }
      
      const uploadResult = await uploadResponse.json();
      if (!uploadResult.success) {
        throw new Error(uploadResult.message || "فشل رفع الملف");
      }
      
      const { file, ...rest } = filePayload;
      finalPayload = {
        ...rest,
        attachmentId: uploadResult.data
      };
    }
    
    // إرسال الرسالة
    const sendUrl = `https://api.eduai.tech/api/v1/messages/new`;
    const urlParams = new URLSearchParams();
    urlParams.append('request', JSON.stringify(finalPayload));
    
    const response = await fetch(`${sendUrl}?${urlParams.toString()}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({})
    });
    
    if (!response.ok) {
      throw new Error(`فشل إرسال الرسالة: ${response.status}`);
    }
    
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "فشل إرسال الرسالة");
    }
    
    return result.data as Message;
  } catch (error) {
    console.error("خطأ في إرسال الرسالة عبر REST:", error);
    return null;
  }
}

// React Hook للاستخدام في المكونات
export const useWebSocketChat = ({
  userId,
  initialMessages,
  onNewMessage
}: UseWebSocketChatProps) => {
  // الحصول على مدير WebSocket
  const wsManager = WebSocketManager.getInstance();
  
  // الحالة
  const [messages, setMessages] = useState<Message[]>(initialMessages || []);
  const [isConnected, setIsConnected] = useState(wsManager.isConnected());
  
  // لضمان تشغيل onNewMessage مرة واحدة فقط للرسالة الواحدة
  const processedMessages = useRef(new Set<string>());
  
  // معالجة الرسائل الجديدة
  const handleNewMessage = useCallback((newMessage: Message) => {
    // تجاهل الرسائل التي ليست للمحادثة الحالية
    if (!userId || String(newMessage.chatId) !== String(userId)) {
      return;
    }
    
    const messageId = safeStringify(newMessage.id);
    
    setMessages(prevMessages => {
      // التحقق من عدم وجود الرسالة مسبقاً
      if (prevMessages.some(msg => safeStringify(msg.id) === messageId)) {
        return prevMessages;
      }
      
      // إشعار بوجود رسالة جديدة إذا لم يتم معالجتها من قبل
      if (!processedMessages.current.has(messageId) && onNewMessage) {
        processedMessages.current.add(messageId);
        setTimeout(onNewMessage, 0);
      }
      
      return [...prevMessages, newMessage];
    });
  }, [userId, onNewMessage]);
  
  // الاشتراك في حالة الاتصال
  useEffect(() => {
    return wsManager.onConnectionChange(setIsConnected);
  }, []);
  
  // الاشتراك في قناة المستخدم
  useEffect(() => {
    if (!userId) return;
    
    console.log(`ضبط اشتراك WebSocket للمستخدم: ${userId}`);
    const unsubscribe = wsManager.subscribeToUser(userId, handleNewMessage);
    
    return () => {
      unsubscribe();
    };
  }, [userId, handleNewMessage]);
  
  // تهيئة الرسائل الأولية
  useEffect(() => {
    if (initialMessages && initialMessages.length > 0) {
      setMessages(initialMessages);
      
      // تحديث قائمة الرسائل المعالجة
      initialMessages.forEach(msg => {
        processedMessages.current.add(safeStringify(msg.id));
      });
    }
  }, [initialMessages]);
  
  // إرسال رسالة
  const sendMessage = async (payload: MessagePayload): Promise<boolean> => {
    if (!userId) {
      return false;
    }
    
    // محاولة الإرسال عبر WebSocket
    if (wsManager.isConnected() && wsManager.sendMessage(payload)) {
      console.log("تم إرسال الرسالة عبر WebSocket");
      return true;
    }
    
    // الإرسال عبر REST كبديل
    console.log("جاري إرسال الرسالة عبر REST API...");
    const newMessage = await sendViaRest(payload);
    
    if (newMessage) {
      handleNewMessage(newMessage);
      return true;
    }
    
    return false;
  };
  
  // إرسال رسالة مع مرفق
  const sendMessageWithAttachment = async (payload: FileMessagePayload): Promise<boolean> => {
    if (!userId) {
      return false;
    }
    
    // الإرسال عبر REST API للملفات
    console.log("إرسال رسالة مع مرفق عبر REST API");
    const newMessage = await sendViaRest(payload);
    
    if (newMessage) {
      handleNewMessage(newMessage);
      return true;
    }
    
    return false;
  };
  
  return {
    messages,
    isConnected,
    sendMessage,
    sendMessageWithAttachment
  };
};
