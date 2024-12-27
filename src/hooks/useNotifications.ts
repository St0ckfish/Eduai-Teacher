import { useState, useEffect, useRef } from 'react';
import { Client as StompClient, type IMessage } from '@stomp/stompjs';
import Cookies from 'js-cookie';
import { baseUrlStock } from '~/APIs/axios';

interface NotificationsHookResult {
  notificationsCount: number;
  isConnected: boolean;
}

export const useNotificationsWebSocket = (userId: string | null): NotificationsHookResult => {
  const [notificationsCount, setNotificationsCount] = useState<number>(0);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const stompClientRef = useRef<StompClient | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const previousCountRef = useRef<number>(0);

  // Preload the notification sound
  useEffect(() => {
    audioRef.current = new Audio('/sounds/notifi.mp3'); // Ensure this path is correct in your public folder
    audioRef.current.preload = 'auto';
  }, []);

  useEffect(() => {
    // Validate token and userId before connection
    const token = Cookies.get('token');
    if (!token || !userId) {
      return;
    }

    // Create STOMP client
    const stompClient = new StompClient({
      brokerURL: `${baseUrlStock}ws?token=${token}`,
      debug: function (str) {
        console.log('[STOMP Notifications Debug]', str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    // Connection success handler
    stompClient.onConnect = () => {
      console.log('WebSocket Notifications Connected Successfully');
      setIsConnected(true);

      // Subscribe to user-specific notifications count channel
      stompClient.subscribe(`/user/${userId}/notifications-count`, (message: IMessage) => {
        try {
          // Parse the notification count from the message
          const count = parseInt(message.body, 10);
          
          // Check if count has increased
          if (count > previousCountRef.current) {
            // Play notification sound
            if (audioRef.current) {
              audioRef.current.play().catch(error => {
                console.error('Error playing notification sound:', error);
              });
            }
          }

          // Update notifications count, ensuring it's not negative
          setNotificationsCount(Math.max(0, count));
          
          // Update previous count reference
          previousCountRef.current = count;
        } catch (parseError) {
          console.error('Error parsing notifications count:', parseError);
        }
      });
    };

    // Error handling
    stompClient.onStompError = frame => {
      console.error('Broker reported notifications error:', frame.headers.message);
      console.error('Details:', frame.body);
      setIsConnected(false);
    };

    stompClient.onWebSocketError = event => {
      console.error('WebSocket notifications connection error:', event);
      setIsConnected(false);
    };

    // Activate the connection
    stompClient.activate();
    stompClientRef.current = stompClient;

    // Cleanup on component unmount
    return () => {
      stompClient.deactivate();
      stompClientRef.current = null;
      setIsConnected(false);
    };
  }, [userId]);

  return {
    notificationsCount,
    isConnected
  };
};
