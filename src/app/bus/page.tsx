"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { Client, type Frame, type Message } from '@stomp/stompjs';
import { MapContainer, TileLayer, Popup, useMapEvents, Marker } from 'react-leaflet';
import { MapPin, Bus as BusIcon } from 'lucide-react';
import { divIcon } from 'leaflet';
import { renderToString } from 'react-dom/server';
import Cookies from 'js-cookie';
import { baseUrlStock } from '~/APIs/axios';
import useLanguageStore, { useUserDataStore } from '~/APIs/store';
import Container from '~/_components/Container';
import 'leaflet/dist/leaflet.css';

interface FormData {
  busId: string;
  longitude: number;
  latitude: number;
}

interface BusLocation {
  busId: number;
  longitude: number;
  latitude: number;
}

interface NotificationData {
  id: number;
  title: string;
  description: string;
}

interface RawBusData {
  data: {
    id: number;
    longitude: number;
    latitude: number;
  };
}

interface Subscription {
  unsubscribe: () => void;
}

// Custom marker using Lucide icon
const createCustomMarkerIcon = (color: string) => {
  const iconHtml = renderToString(
    <div className="relative">
      <MapPin size={32} color={color} fill={color} fillOpacity={0.2} />
      <div className="absolute bottom-0 left-1/2 w-px h-px bg-transparent" />
    </div>
  );

  return divIcon({
    html: iconHtml,
    className: 'custom-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

// Custom map marker component
const LocationMarker: React.FC<{
  onLocationSelect: (lat: number, lng: number) => void;
  position: [number, number] | null;
}> = ({ onLocationSelect, position }) => {
  const map = useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return position ? (
    <Marker
      position={position}
      icon={createCustomMarkerIcon('#e84743')} // Using blue color for marker
    >
      <Popup>Selected Location</Popup>
    </Marker>
  ) : null;
};

const Bus: React.FC = () => {
  const [connected, setConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<BusLocation[]>([]);
  const [formData, setFormData] = useState<FormData>({
    busId: '',
    longitude: 0,
    latitude: 0
  });
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null);
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null);
  
  const token = Cookies.get('token');
  const userData = useUserDataStore.getState().userData;
  const userId = userData.id;

  // Map default position (center of the map)
  const defaultPosition: [number, number] = [29.261243, -9.873053];

  const handleLocationSelect = (lat: number, lng: number) => {
    setMarkerPosition([lat, lng]);
    setFormData(prev => ({
      ...prev,
      latitude: lat,
      longitude: lng
    }));
  };

  // Rest of the WebSocket logic remains the same
  const subscribeToBusLocation = useCallback((client: Client, busId: string) => {
    if (currentSubscription) {
      currentSubscription.unsubscribe();
    }

    const subscription = client.subscribe(`/topic/bus-location/${busId}`, (message: Message) => {
      const rawData: RawBusData = JSON.parse(message.body);
      const data: BusLocation = {
        busId: rawData.data.id,
        longitude: rawData.data.longitude,
        latitude: rawData.data.latitude
      };
      addMessage(data);
    });

    setCurrentSubscription(subscription);
  }, [currentSubscription]);

  // WebSocket connection setup
  useEffect(() => {
    const client = new Client({
      brokerURL: `${baseUrlStock}ws?token=${token}`,
      debug: (str: string) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = (frame: Frame) => {
      setConnected(true);
      console.log('Connected: ' + JSON.stringify(frame));

      try {
        client.subscribe(`/user/${userId}/notifications`, (message: Message) => {
          const rawData: NotificationData = JSON.parse(message.body);
          showNotification(rawData);
        });

        if (formData.busId) {
          subscribeToBusLocation(client, formData.busId);
        }
      } catch (error) {
        console.error('Error in connection:', error);
      }
    };


    setStompClient(client);

    return () => {
      if (currentSubscription) {
        currentSubscription.unsubscribe();
      }
      if (client) {
        void client.deactivate();
      }
    };
  }, [userId, token, subscribeToBusLocation, formData.busId, currentSubscription]);

  const connect = useCallback(() => {
    if (stompClient) {
      stompClient.activate();
    }
  }, [stompClient]);

  const disconnect = useCallback(() => {
    if (stompClient) {
      if (currentSubscription) {
        currentSubscription.unsubscribe();
        setCurrentSubscription(null);
      }
      void stompClient.deactivate();
      setConnected(false);
      setMessages([]);
    }
  }, [stompClient, currentSubscription]);
  const language = useLanguageStore((state) => state.language);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const sendData = useCallback(() => {
    if (!formData.busId || !formData.longitude || !formData.latitude) {
      alert("Please fill all fields and select a location on the map!");
      return;
    }

    const data: BusLocation = {
      busId: parseInt(formData.busId),
      longitude: formData.longitude,
      latitude: formData.latitude,
    };

    try {
      if (!stompClient) {
        throw new Error('STOMP client is not initialized');
      }

      stompClient.publish({
        destination: "/app/update-location",
        body: JSON.stringify(data),
      });
      console.log("Data sent successfully:", data);
    } catch (error) {
      console.error("Error during data sending:", error);
    }
  }, [stompClient, formData]);

  const addMessage = (data: BusLocation) => {
    setMessages(prev => [...prev, data]);
  };

  const showNotification = (data: NotificationData) => {
    if (Notification.permission === "granted") {
      new Notification("Bus Location Update", {
        body: `Bus ID: ${data.id} - ${data.title}: ${data.description}`,
        icon: "/bus-icon.png"
      });
    }
  };

  useEffect(() => {
    if (Notification.permission === "default") {
      void Notification.requestPermission().then(permission => {
        console.log("Notification permission: ", permission);
      });
    }
  }, []);

  return (
    <Container>
  <div className="p-6 max-w-7xl mx-auto">
    <div className="bg-bgPrimary rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <BusIcon className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-textSecondary">
          {language === 'fr' 
            ? 'Suivi de localisation des bus'
            : language === 'ar' 
            ? 'تعقب موقع الحافلة'
            : 'Bus Location Tracker'}
        </h1>
      </div>
      <div className="mb-6 space-x-4">
        <button
          className={`inline-flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-colors duration-200 ${
            connected 
              ? 'bg-bgSecondary cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
          onClick={connect}
          disabled={connected}
        >
          <div className={`w-2 h-2 rounded-full ${connected ? 'bg-gray-400' : 'bg-green-400'}`} />
          {language === 'fr' 
            ? 'Connecter'
            : language === 'ar' 
            ? 'توصيل'
            : 'Connect'}
        </button>
        <button
          className={`inline-flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-colors duration-200 ${
            !connected 
              ? 'bg-bgSecondary cursor-not-allowed' 
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
          onClick={disconnect}
          disabled={!connected}
        >
          <div className={`w-2 h-2 rounded-full ${!connected ? 'bg-gray-400' : 'bg-red-400'}`} />
          {language === 'fr' 
            ? 'Déconnecter'
            : language === 'ar' 
            ? 'فصل'
            : 'Disconnect'}
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <BusIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="busId"
              className="w-full pl-10 border border-borderPrimary rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={
                language === 'fr' 
                  ? 'Entrez l’ID du bus'
                  : language === 'ar' 
                  ? 'أدخل معرف الحافلة'
                  : 'Enter Bus ID'
              }
              value={formData.busId}
              onChange={handleInputChange}
            />
          </div>

          <div className="h-96 rounded-lg overflow-hidden border border-gray-300">
            <MapContainer
              center={defaultPosition}
              zoom={13}
              className="h-full w-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <LocationMarker
                onLocationSelect={handleLocationSelect}
                position={markerPosition}
              />
            </MapContainer>
          </div>

          <button
            className="w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            onClick={sendData}
          >
            <MapPin className="w-5 h-5" />
            {language === 'fr' 
              ? 'Mettre à jour la localisation'
              : language === 'ar' 
              ? 'تحديث الموقع'
              : 'Update Location'}
          </button>
        </div>

        {connected && (
          <div className="bg-bgSecondary rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              {language === 'fr' 
                ? 'Mises à jour de localisation'
                : language === 'ar' 
                ? 'تحديثات الموقع'
                : 'Location Updates'}
            </h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className="bg-white p-3 rounded-lg shadow-sm border border-gray-200"
                >
                  <div className="font-medium text-gray-800 flex items-center gap-2">
                    <BusIcon className="w-4 h-4 text-blue-600" />
                    {language === 'fr' 
                      ? `ID de bus : ${msg.busId}`
                      : language === 'ar' 
                      ? `رقم معرف الحافلة: ${msg.busId}`
                      : `Bus ID: ${msg.busId}`}
                  </div>
                  <div className="text-gray-600 pl-6">
                    {language === 'fr' 
                      ? `Longitude : ${msg.longitude.toFixed(6)}
                        
 Latitude : ${msg.latitude.toFixed(6)}`
                      : language === 'ar' 
                      ? `الخط الطولي: ${msg.longitude.toFixed(6)}
                        
 العرض: ${msg.latitude.toFixed(6)}`
                      : `Longitude: ${msg.longitude.toFixed(6)}
                        
 Latitude: ${msg.latitude.toFixed(6)}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
</Container>
  );
};

export default Bus;