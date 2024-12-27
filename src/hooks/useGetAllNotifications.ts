import { useState, useEffect, useRef } from 'react';
import { type Client as StompClient, type IMessage, Client } from '@stomp/stompjs';
import Cookies from 'js-cookie';
import { baseUrlStock } from '~/APIs/axios';

interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  picture?: string;
}


export const useNotificationsSocket = (userId: string | null) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const stompClientRef = useRef<StompClient | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Preload notification sound
  useEffect(() => {
    audioRef.current = new Audio('/notifi.mp3');
    audioRef.current.preload = 'auto';
  }, []);

  // Reset notifications method
  const resetNotifications = () => {
    setNotifications([]);
  };

  useEffect(() => {
    // Validate token and userId before connection
    const token = Cookies.get('token');
    if (!token || !userId) {
      return;
    }

    // Create STOMP client
    const stompClient = new Client({
      brokerURL: `${baseUrlStock}ws?token=${token}`,
      debug: function (str: string) {
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

      // Subscribe to user-specific notifications channel
      stompClient.subscribe(`/user/${userId}/notifications`, (message: IMessage) => {
        try {
          // Parse the notification from the message
          const newNotification: Notification = JSON.parse(message.body) as Notification;
          
          // Play notification sound
          if (audioRef.current) {
            audioRef.current.play().catch(error => {
              console.error('Error playing notification sound:', error);
            });
          }

          // Update notifications state
          setNotifications(prevNotifications => {
            // Check if notification already exists to prevent duplicates
            const exists = prevNotifications.some(n => n.id === newNotification.id);
            return exists 
              ? prevNotifications 
              : [newNotification, ...prevNotifications];
          });
        } catch (parseError) {
          console.error('Error parsing notification:', parseError);
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
      void stompClient.deactivate();
      stompClientRef.current = null;
      setIsConnected(false);
    };
  }, [userId]);

  return {
    notifications,
    isConnected,
    resetNotifications
  };
};
