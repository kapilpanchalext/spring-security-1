"use client"
import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';

const SOCKET_URL = 'ws://localhost:9001/ws-message';

export default function Home() {

  const [client, setClient] = useState<Client>();
  const [inputMessage, setInputMessage] = useState<string>("");
  const [sentMessages, setSentMessages] = useState<string[]>([]);
  const [receivedMessages, setReceivedMessages] = useState<string>();

  useEffect(() => {
    const stompClient = new Client({
      brokerURL: SOCKET_URL,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.onConnect = () => {
      console.log("Connected to WebSocket");
      
      // Subscribe to receive messages
      stompClient.subscribe("/topic/greetings", (msg) => {
        if (msg.body) {
          const messageBody = JSON.parse(msg.body);
          setReceivedMessages(messageBody.message);
        }
      });
    };

    stompClient.activate();
    setClient(stompClient);

    // Cleanup
    return () => {
      stompClient.deactivate();
    };
  }, []);

  // Send message to the backend
  const sendMessage = () => {
    if (inputMessage.trim() && client) {
      const message = { message: inputMessage };
      client.publish({
        destination: "/app/hello",
        body: JSON.stringify(message),
      });

      // Update sent messages
      setSentMessages((prev) => [...prev, inputMessage]);
      setInputMessage("");
    }
  };

  return (
    <>
    <div>
      <h1>WebSocket - V1</h1>

      {/* Send Message */}
      <div>
        <label>Send Message</label>
        <input
          type="text"
          placeholder="Send Messages"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      {/* Sent Messages */}
      <div>
        <label>Sent Messages</label>
        <ul>
          {sentMessages.length > 0 ? (
            sentMessages.map((msg, index) => <li key={index}>{msg}</li>)
          ) : (
            <p>No messages sent yet</p>
          )}
        </ul>
      </div>

      {/* Received Messages */}
      <div>
        <label>Received Messages</label>
        <h1 style={{textAlign: "center", fontSize: "5rem"}}>{receivedMessages}</h1>
      </div>
    </div>
  </>
  );
}
