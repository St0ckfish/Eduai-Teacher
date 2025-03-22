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

// الحل المبسط لإرسال رسائل نصية - تركيز على REST API فقط
export const useWebSocketChat = ({
  userId,
  initialMessages,
  onNewMessage,
}: UseWebSocketChatProps) => {
  // حالة المكون
  const [messages, setMessages] = useState<Message[]>(initialMessages || []);
  const [isConnected, setIsConnected] = useState(false);
  
  // مراجع مهمة
  const messagesMap = useRef(new Map<string, Message>());
  const isMounted = useRef(true);
  
  // تهيئة الرسائل الأولية
  useEffect(() => {
    if (initialMessages && initialMessages.length > 0) {
      const newMap = new Map<string, Message>();
      initialMessages.forEach(msg => {
        newMap.set(safeStringify(msg.id), msg);
      });
      messagesMap.current = newMap;
      setMessages(initialMessages);
    }
  }, [initialMessages]);
  
  // تنظيف عند إلغاء تحميل المكون
  useEffect(() => {
    isMounted.current = true;
    
    return () => {
      isMounted.current = false;
    };
  }, []);
  
  // الحصول على رمز التوثيق
  const getToken = useCallback(() => {
    return Cookies.get("token") || null;
  }, []);
  
  // رفع ملف إلى الخادم
  const uploadFile = async (file: File): Promise<string> => {
    if (!userId) {
      throw new Error("معرف المستخدم غير موجود");
    }
    
    const token = getToken();
    if (!token) {
      throw new Error("رمز التوثيق غير موجود");
    }
    
    const formData = new FormData();
    formData.append("file", file);
    
    const uploadUrl = `https://api.eduai.tech/api/v1/messages/${userId}/file`;
    
    console.log(`رفع ملف إلى ${uploadUrl}`);
    
    const response = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });
    
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`فشل رفع الملف: ${response.status} - ${text}`);
    }
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || "فشل رفع الملف");
    }
    
    console.log("تم رفع الملف بنجاح، المعرف:", result.data);
    return result.data;
  };
  
  // إرسال أي نوع من الرسائل عبر REST API
  const sendMessageViaRest = async (payload: MessagePayload | FileMessagePayload): Promise<boolean> => {
    if (!userId) {
      console.error("لا يمكن إرسال الرسالة: معرف المستخدم غير موجود");
      return false;
    }
    
    try {
      const token = getToken();
      if (!token) {
        console.error("لا يمكن إرسال الرسالة: رمز التوثيق غير موجود");
        return false;
      }
      
      // إعداد البيانات المناسبة للإرسال
      interface RequestPayload {
        chatId: number;
        content: string;
        attachmentId: string;
      }

      const requestPayload: RequestPayload = {
        chatId: Number(payload.chatId),
        content: payload.content,
        attachmentId: ""
      };
      
      // إذا كان هناك ملف، قم برفعه أولاً
      if ('file' in payload && payload.file) {
        try {
          const attachmentId = await uploadFile(payload.file);
          requestPayload.attachmentId = attachmentId;
        } catch (error) {
          console.error("فشل رفع الملف:", error);
          return false;
        }
      }
      
      // طباعة البيانات قبل الإرسال للتحقق
      console.log("بيانات الرسالة للإرسال:", JSON.stringify(requestPayload));
      
      // إرسال الرسالة
      const sendUrl = `https://api.eduai.tech/api/v1/messages/new`;
      const urlParams = new URLSearchParams();
      urlParams.append('request', JSON.stringify(requestPayload));
      
      console.log(`إرسال رسالة إلى ${sendUrl}`);
      
      const response = await fetch(`${sendUrl}?${urlParams.toString()}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({})
      });
      
      // فحص الاستجابة
      if (!response.ok) {
        const text = await response.text();
        console.error(`فشل إرسال الرسالة (${response.status}):`, text);
        return false;
      }
      
      const result = await response.json();
      console.log("استجابة الخادم:", result);
      
      if (!result.success) {
        console.error("رد الخادم يشير إلى فشل:", result.message);
        return false;
      }
      
      if (result.data) {
        // إضافة الرسالة الجديدة إلى الحالة
        const newMessage = result.data as Message;
        
        if (isMounted.current) {
          setMessages(prevMessages => {
            // التحقق من عدم وجود الرسالة مسبقاً
            const messageId = safeStringify(newMessage.id);
            if (prevMessages.some(msg => safeStringify(msg.id) === messageId)) {
              return prevMessages;
            }
            
            // تخزين الرسالة في الخريطة
            messagesMap.current.set(messageId, newMessage);
            
            // إشعار بوجود رسالة جديدة
            if (onNewMessage) {
              setTimeout(onNewMessage, 0);
            }
            
            return [...prevMessages, newMessage];
          });
        }
      }
      
      console.log("تم إرسال الرسالة بنجاح");
      return true;
    } catch (error) {
      console.error("خطأ في إرسال الرسالة:", error);
      return false;
    }
  };
  
  // واجهة موحدة لإرسال رسائل نصية
  const sendMessage = async (payload: MessagePayload): Promise<boolean> => {
    console.log("إرسال رسالة نصية:", payload);
    return sendMessageViaRest(payload);
  };
  
  // واجهة موحدة لإرسال رسائل مع مرفقات
  const sendMessageWithAttachment = async (payload: FileMessagePayload): Promise<boolean> => {
    console.log("إرسال رسالة مع مرفق:", payload);
    return sendMessageViaRest(payload);
  };
  
  return {
    messages,
    isConnected,
    sendMessage,
    sendMessageWithAttachment
  };
};
