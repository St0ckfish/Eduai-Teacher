import { type Client as StompClient, type IMessage, Client } from "@stomp/stompjs";
import { useEffect, useRef, useState, useCallback } from "react";
import Cookies from "js-cookie";

// Interface definitions for attachment and message types
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

// Helper function to safely stringify message IDs for comparison
const safeStringify = (id: string | number | null | undefined): string => {
  return id != null ? String(id) : '';
};

// The main WebSocket hook
export const useWebSocketChat = ({
  userId,
  initialMessages,
  onNewMessage,
}: UseWebSocketChatProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages || []);
  const [isConnected, setIsConnected] = useState(false);
  const stompClientRef = useRef<StompClient | null>(null);
  const messagesMapRef = useRef<Map<string, Message>>(new Map());
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const connectionAttempts = useRef(0);
  const MAX_RECONNECT_ATTEMPTS = 5;

  // Token management
  const getToken = useCallback(() => {
    return Cookies.get("token") || null;
  }, []);

  // Handle initialization of messages
  useEffect(() => {
    if (initialMessages && initialMessages.length > 0) {
      const newMap = new Map<string, Message>();
      initialMessages.forEach(msg => {
        newMap.set(safeStringify(msg.id), msg);
      });
      messagesMapRef.current = newMap;
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  // Setup WebSocket connection
  const setupWebSocket = useCallback(() => {
    const token = getToken();
    
    if (!token || !userId) {
      console.log("Cannot setup WebSocket: token or userId missing");
      return;
    }

    // Don't try to reconnect too many times
    if (connectionAttempts.current >= MAX_RECONNECT_ATTEMPTS) {
      console.log(`Maximum reconnection attempts (${MAX_RECONNECT_ATTEMPTS}) reached. Giving up.`);
      return;
    }
    
    connectionAttempts.current += 1;
    
    // Clean up any existing connection first
    if (stompClientRef.current) {
      try {
        stompClientRef.current.deactivate();
      } catch (error) {
        console.error("Error deactivating previous STOMP client:", error);
      }
      stompClientRef.current = null;
    }

    // Use direct WebSocket URL
    const brokerURL = `wss://api.eduai.tech/ws?token=${encodeURIComponent(token)}`;
    
    console.log("Connecting to WebSocket URL:", brokerURL);

    // Create a new STOMP client
    const stompClient = new Client({
      brokerURL: brokerURL,
      debug: function (str: string) {
        console.log("[STOMP Debug]", str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      connectionTimeout: 10000,  // Give it more time to connect
    });

    stompClient.onConnect = () => {
      console.log("WebSocket Connected Successfully");
      setIsConnected(true);
      connectionAttempts.current = 0; // Reset counter on successful connection
      
      try {
        // Subscribe to user-specific channel
        const subscriptionPath = `/direct-chat/${userId}`;
        console.log(`Subscribing to: ${subscriptionPath}`);
        
        const subscription = stompClient.subscribe(subscriptionPath, (message: IMessage) => {
          console.log("Received message via WebSocket:", message);
          
          try {
            if (!message.body) {
              console.error("Empty message body received");
              return;
            }
            
            const newMessage: Message = JSON.parse(message.body);
            console.log("Parsed message:", newMessage);
            
            // Make sure we have a valid message with an ID
            if (!newMessage || !newMessage.id) {
              console.error("Invalid message format received:", newMessage);
              return;
            }
            
            setMessages(prevMessages => {
              const messageId = safeStringify(newMessage.id);
              
              // Check if message already exists
              const messageExists = prevMessages.some(msg => 
                safeStringify(msg.id) === messageId
              );
              
              if (messageExists) {
                console.log("Duplicate message detected, skipping:", messageId);
                return prevMessages;
              }
              
              console.log("Adding new message to state:", newMessage);
              messagesMapRef.current.set(messageId, newMessage);
              
              return [...prevMessages, newMessage];
            });
            
            // Notify about new message in a setTimeout to avoid React batching issues
            if (onNewMessage) {
              console.log("Calling onNewMessage callback");
              setTimeout(onNewMessage, 0);
            }
          } catch (parseError) {
            console.error("Error parsing incoming message:", parseError, "Raw message:", message.body);
          }
        });
        
        console.log("Subscription successful:", subscription);
      } catch (error) {
        console.error("Error subscribing to chat:", error);
      }
    };

    stompClient.onStompError = frame => {
      console.error("Broker reported error:", frame.headers.message);
      setIsConnected(false);
      // Schedule reconnection
      scheduleReconnect();
    };

    stompClient.onWebSocketError = event => {
      console.error("WebSocket connection error:", event);
      setIsConnected(false);
      // Schedule reconnection
      scheduleReconnect();
    };

    stompClient.onWebSocketClose = () => {
      console.log("WebSocket connection closed");
      setIsConnected(false);
      // Schedule reconnection
      scheduleReconnect();
    };

    // Store the client reference before activating
    stompClientRef.current = stompClient;
    
    try {
      stompClient.activate();
    } catch (error) {
      console.error("Error activating STOMP client:", error);
      stompClientRef.current = null;
      // Schedule reconnection
      scheduleReconnect();
    }
  }, [userId, getToken, onNewMessage]);

  // Helper function to schedule reconnection with exponential backoff
  const scheduleReconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    if (connectionAttempts.current < MAX_RECONNECT_ATTEMPTS) {
      const backoffTime = Math.min(1000 * Math.pow(2, connectionAttempts.current), 30000);
      console.log(`Scheduling reconnect attempt in ${backoffTime/1000} seconds...`);
      
      reconnectTimeoutRef.current = setTimeout(() => {
        console.log("Attempting to reconnect WebSocket...");
        setupWebSocket();
      }, backoffTime);
    }
  }, [setupWebSocket]);

  // Connect when component mounts or userId changes
  useEffect(() => {
    if (userId) {
      setupWebSocket();
    }

    // Clean up function
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
      
      if (stompClientRef.current) {
        console.log("Cleaning up WebSocket connection");
        try {
          stompClientRef.current.deactivate();
        } catch (error) {
          console.error("Error deactivating STOMP client during cleanup:", error);
        }
        stompClientRef.current = null;
      }
      setIsConnected(false);
    };
  }, [userId, setupWebSocket]);

  // Upload file to server with retry logic
  const uploadFile = async (file: File, retryCount = 0): Promise<string> => {
    const maxRetries = 2;
    const token = getToken();
    
    if (!token || !userId) {
      throw new Error("Token or userId is missing");
    }
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadUrl = `https://api.eduai.tech/api/v1/messages/${userId}/file`;
      
      console.log(`Uploading file to ${uploadUrl}`);
      
      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // No Content-Type header for multipart/form-data
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result = await response.json();
      
      if (!result || result.success === false) {
        console.error("File upload failed:", result);
        throw new Error(result?.message || "File upload failed without success");
      }
      
      console.log("File upload successful:", result);
      
      // Return the file ID from the response
      return result.data;
    } catch (error) {
      console.error(`File upload error (attempt ${retryCount + 1}/${maxRetries + 1}):`, error);
      
      // Retry logic for transient errors
      if (retryCount < maxRetries) {
        console.log(`Retrying file upload... (${retryCount + 1}/${maxRetries})`);
        // Wait between retries with exponential backoff
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
        return uploadFile(file, retryCount + 1);
      }
      
      throw error;
    }
  };

  // Send a message with an attachment
  const sendMessageWithAttachment = async (messagePayload: FileMessagePayload): Promise<boolean> => {
    const token = getToken();
    if (!token || !userId) {
      console.error("Cannot send message: missing token or userId");
      return false;
    }
    
    try {
      let attachmentId = "";
      if (messagePayload.file) {
        // First upload the file to get its ID
        attachmentId = await uploadFile(messagePayload.file);
        console.log(`Received attachment ID: ${attachmentId}`);
      }

      // Prepare payload without the file property
      const { file, ...messageData } = messagePayload;
      const payload = {
        ...messageData,
        attachmentId: attachmentId || undefined,
      };

      // Send message with attachment
      const sendUrl = `https://api.eduai.tech/api/v1/messages/new`;
      
      // Format request parameters
      const urlParams = new URLSearchParams();
      urlParams.append('request', JSON.stringify(payload));
      
      console.log(`Sending message with attachment to ${sendUrl} with params:`, urlParams.toString());
      
      const response = await fetch(`${sendUrl}?${urlParams.toString()}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}), // Empty body as we're using URL params
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const responseData = await response.json();
      console.log("Message send response:", responseData);
      
      if (responseData.success && responseData.data) {
        // Add the new message to our local state
        const newMessage = responseData.data;
        
        setMessages(prev => {
          // Check if message already exists
          const messageId = safeStringify(newMessage.id);
          if (prev.some(msg => safeStringify(msg.id) === messageId)) {
            return prev;
          }
          
          // Add new message and update our message map
          messagesMapRef.current.set(messageId, newMessage);
          return [...prev, newMessage];
        });
        
        // Notify about new message
        if (onNewMessage) {
          setTimeout(onNewMessage, 0);
        }
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Sending message with attachment failed:", error);
      return false;
    }
  };

  // Send a regular text message
  const sendMessage = async (messagePayload: MessagePayload): Promise<boolean> => {
    // Ensure we're using string IDs consistently
    const normalizedPayload = {
      ...messagePayload,
      chatId: String(messagePayload.chatId)
    };
    
    // Try to send via WebSocket first if connected
    if (stompClientRef.current?.connected) {
      try {
        console.log("Sending message via WebSocket:", normalizedPayload);
        
        stompClientRef.current.publish({
          destination: "/app/chat.sendMessage", // Updated to match server-side endpoint
          body: JSON.stringify(normalizedPayload),
          headers: { 'content-type': 'application/json' }
        });
        
        console.log("Message sent via WebSocket successfully");
        return true;
      } catch (error) {
        console.error("WebSocket message sending failed:", error);
        console.log("Falling back to REST API...");
        // Fall through to REST API
      }
    } else {
      console.log("WebSocket not connected, using REST API");
    }
    
    // Fallback to REST API
    const token = getToken();
    if (!token) {
      console.error("Cannot send message: missing token");
      return false;
    }
    
    try {
      const sendUrl = `https://api.eduai.tech/api/v1/messages/new`;
      
      // Format request parameters
      const urlParams = new URLSearchParams();
      urlParams.append('request', JSON.stringify(normalizedPayload));
      
      console.log(`Sending message via REST API to ${sendUrl} with params:`, urlParams.toString());
      
      const response = await fetch(`${sendUrl}?${urlParams.toString()}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}), // Empty body as we're using URL params
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const responseData = await response.json();
      console.log("REST API message response:", responseData);
      
      if (responseData.success && responseData.data) {
        // Add the message to our local state
        const newMessage = responseData.data;
        
        setMessages(prev => {
          // Check if message already exists
          const messageId = safeStringify(newMessage.id);
          if (prev.some(msg => safeStringify(msg.id) === messageId)) {
            return prev;
          }
          
          // Add new message and update our message map
          messagesMapRef.current.set(messageId, newMessage);
          return [...prev, newMessage];
        });
        
        // Notify about new message
        if (onNewMessage) {
          setTimeout(onNewMessage, 0);
        }
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("REST API message sending failed:", error);
      return false;
    }
  };

  return {
    messages,
    isConnected,
    sendMessage,
    sendMessageWithAttachment,
  };
};