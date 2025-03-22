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
  refetchFunction?: () => Promise<void>; // New prop to accept external refetch function
  pollingInterval?: number; // How often to check for new messages
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

// Enhanced REST-based chat hook with polling
export const useWebSocketChat = ({
  userId,
  initialMessages,
  onNewMessage,
  refetchFunction, // External refetch function from RTK Query
  pollingInterval = 5000, // Default to 5 seconds
}: UseWebSocketChatProps) => {
  // حالة المكون
  const [messages, setMessages] = useState<Message[]>(initialMessages || []);
  const [isConnected, setIsConnected] = useState(true); // Assume connected by default
  const [lastMessageId, setLastMessageId] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  
  // مراجع مهمة
  const messagesMap = useRef(new Map<string, Message>());
  const pollingTimer = useRef<NodeJS.Timeout | null>(null);
  const isMounted = useRef(true);
  const lastActivityTime = useRef(Date.now());
  const currentChatId = useRef<string | null>(null);
  
  // Update current chat ID when it changes
  useEffect(() => {
    currentChatId.current = userId ? String(userId) : null;
    
    // Reset polling state when chat changes
    if (pollingTimer.current) {
      clearTimeout(pollingTimer.current);
      pollingTimer.current = null;
    }
    
    // Start polling for the new chat
    if (userId) {
      startPolling();
    }
    
    return () => {
      if (pollingTimer.current) {
        clearTimeout(pollingTimer.current);
        pollingTimer.current = null;
      }
    };
  }, [userId]);
  
  // تهيئة الرسائل الأولية
  useEffect(() => {
    if (initialMessages && initialMessages.length > 0) {
      const newMap = new Map<string, Message>();
      let latestId: string | null = null;
      let latestTimestamp = 0;
      
      initialMessages.forEach(msg => {
        // Only store messages for the current chat
        if (String(msg.chatId) === currentChatId.current) {
          const msgId = safeStringify(msg.id);
          newMap.set(msgId, msg);
          
          // Track latest message by timestamp
          const msgTime = new Date(msg.creationTime).getTime();
          if (msgTime > latestTimestamp) {
            latestTimestamp = msgTime;
            latestId = msgId;
          }
        }
      });
      
      messagesMap.current = newMap;
      setMessages(initialMessages);
      
      // Update last message ID if we found one
      if (latestId) {
        setLastMessageId(latestId);
      }
    }
  }, [initialMessages]);
  
  // تنظيف عند إلغاء تحميل المكون
  useEffect(() => {
    isMounted.current = true;
    
    return () => {
      isMounted.current = false;
      if (pollingTimer.current) {
        clearTimeout(pollingTimer.current);
        pollingTimer.current = null;
      }
    };
  }, []);
  
  // الحصول على رمز التوثيق
  const getToken = useCallback(() => {
    return Cookies.get("token") || null;
  }, []);
  
  // Start polling for new messages
  const startPolling = useCallback(() => {
    if (!userId || isPolling || !isMounted.current) return;
    
    setIsPolling(true);
    
    const poll = async () => {
      try {
        // If we have an external refetch function, use it
        if (refetchFunction) {
          await refetchFunction();
        }
        
        // Always update the last activity time
        lastActivityTime.current = Date.now();
        
        // Schedule next poll if still mounted
        if (isMounted.current) {
          pollingTimer.current = setTimeout(() => void poll(), pollingInterval);
        }
      } catch (error) {
        console.error("Polling error:", error);
        // Try again after error with exponential backoff
        if (isMounted.current) {
          pollingTimer.current = setTimeout(() => void poll(), Math.min(pollingInterval * 2, 30000));
        }
      }
    };
    
    // Start polling
    poll();
    
    return () => {
      setIsPolling(false);
      if (pollingTimer.current) {
        clearTimeout(pollingTimer.current);
        pollingTimer.current = null;
      }
    };
  }, [userId, isPolling, refetchFunction, pollingInterval]);
  
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
    
    try {
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
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
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
      
      // Update last activity time
      lastActivityTime.current = Date.now();
      
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
            setLastMessageId(messageId);
            
            // Trigger a refetch to ensure we have the most up-to-date data
            if (refetchFunction) {
              setTimeout(() => {
                refetchFunction();
              }, 300);
            }
            
            // إشعار بوجود رسالة جديدة
            if (onNewMessage) {
              setTimeout(onNewMessage, 0);
            }
            
            // Sort messages by creation time
            const updatedMessages = [...prevMessages, newMessage].sort((a, b) => 
              new Date(a.creationTime).getTime() - new Date(b.creationTime).getTime()
            );
            
            return updatedMessages;
          });
        }
      }
      
      console.log("تم إرسال الرسالة بنجاح");
      return true;
    } catch (error) {
      console.error("خطأ في إرسال الرسالة:", error);
      
      // Set connection state to disconnected if we have network errors
      setIsConnected(false);
      
      // Try to reconnect after a brief delay
      setTimeout(() => {
        if (isMounted.current) {
          setIsConnected(true);
        }
      }, 3000);
      
      return false;
    }
  };
  
  // واجهة موحدة لإرسال رسائل نصية
  const sendMessage = async (payload: MessagePayload): Promise<boolean> => {
    console.log("إرسال رسالة نصية:", payload);
    const success = await sendMessageViaRest(payload);
    
    // If message was sent successfully, trigger an immediate refetch
    if (success && refetchFunction) {
      setTimeout(() => {
        refetchFunction();
      }, 300);
    }
    
    return success;
  };
  
  // واجهة موحدة لإرسال رسائل مع مرفقات
  const sendMessageWithAttachment = async (payload: FileMessagePayload): Promise<boolean> => {
    console.log("إرسال رسالة مع مرفق:", payload);
    const success = await sendMessageViaRest(payload);
    
    // If message was sent successfully, trigger an immediate refetch
    if (success && refetchFunction) {
      setTimeout(() => {
        refetchFunction();
      }, 300);
    }
    
    return success;
  };
  
  // Define manual refetch function
  const refetch = useCallback(() => {
    if (refetchFunction) {
      console.log("Manual refetch triggered");
      refetchFunction();
    }
  }, [refetchFunction]);
  
  // Export interface
  return {
    messages,
    isConnected,
    sendMessage,
    sendMessageWithAttachment,
    refetch
  };
};
