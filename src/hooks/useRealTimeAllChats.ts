import { useState, useEffect, useRef } from 'react';
import { Client, type IMessage } from '@stomp/stompjs';
import Cookies from 'js-cookie';
import { baseUrlStock } from '~/APIs/axios';

interface ChatUpdate {
  chatId: string;
  targetUser: {
    id: string;
    name: string;
    Role: string;
    hasPhoto: boolean;
    photoLink?: string;
  };
  lastMessage: string;
  numberOfNewMessages: number;
}

interface UseChatListSocketResult {
  isConnected: boolean;
}

export const useChatListSocket = (
  userId: string | null,
  onChatUpdate: (update: ChatUpdate) => void
): UseChatListSocketResult => {
  const [isConnected, setIsConnected] = useState(false);
  const stompClientRef = useRef<Client | null>(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token || !userId) {
      return;
    }

    const stompClient = new Client({
      brokerURL: `${baseUrlStock}ws?token=${token}`,
      debug: function (str) {
        console.log('[STOMP Chat List Debug]', str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.onConnect = () => {
      console.log('WebSocket Chat List Connected Successfully');
      setIsConnected(true);

      // Subscribe to chat list updates
      stompClient.subscribe(`/user/${userId}/chat-updates`, (message: IMessage) => {
        try {
          const chatUpdate: ChatUpdate = JSON.parse(message.body);
          onChatUpdate(chatUpdate);
        } catch (parseError) {
          console.error('Error parsing chat update:', parseError);
        }
      });
    };

    stompClient.onStompError = frame => {
      console.error('Broker reported chat list error:', frame.headers.message);
      console.error('Details:', frame.body);
      setIsConnected(false);
    };

    stompClient.onWebSocketError = event => {
      console.error('WebSocket chat list connection error:', event);
      setIsConnected(false);
    };

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
      stompClientRef.current = null;
      setIsConnected(false);
    };
  }, [userId, onChatUpdate]);

  return {
    isConnected
  };
};
