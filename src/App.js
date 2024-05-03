import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container,  } from 'react-bootstrap';
import WaitingRoom from './components/waitingroom';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { LogLevel } from '@microsoft/signalr';
import { useState } from 'react';
import ChatRoom from './components/ChatRoom';

function App() {
  const [conn, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);

  const joinChatRoom = async ({ username, chatroom }) => {
    try {
      const conn = new HubConnectionBuilder()
        .withUrl('http://localhost:5110/ChatHub')
        .configureLogging(LogLevel.Information)
        .build();

      // Receive general messages
      conn.on('ReceiveMessage', (username, msg) => {
        setMessages(messages => [...messages, { username, msg }]);
      });

      // Handle join room notifications
      conn.on('JoinSpecificChatRoom', (username, msg) => {
        // Now storing the message to state to show in the chat
        setMessages(messages => [...messages, { username, msg }]);
    });
      // Receive specific messages (typo corrected)
      conn.on("ReceiveSpecificMessage", (username, msg) => {
        setMessages(messages => [...messages, { username, msg }]);
      });

      await conn.start();
      await conn.invoke('JoinSpecificChatRoom', { username, chatroom });
      setConnection(conn);
    } catch (e) {
      console.error('Error:', e);
      alert('Failed to connect to the chat room.'); // Providing user feedback on failure
    }
  }

  const sendMessage = async (message) => {
    try {
      await conn.invoke('SendMessage', message);
    } catch (e) {
      console.error('Error:', e);
      alert('Failed to send message.'); // Providing user feedback on failure
    }
  }

  return (
    <div className="main-container">
      <main>
        <Container className="container">
          <div className="header">
            <h1 className="welcome-message">Welcome to the Football Chat</h1>
          </div>
          {!conn 
            ? <WaitingRoom joinChatRoom={joinChatRoom} />
            : <ChatRoom messages={messages} sendMessage={sendMessage} />
          }
        </Container>
      </main>
    </div>
  );
}

export default App;