import { Col, Row } from "react-bootstrap";
import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";

const ChatRoom = ({ messages, sendMessage }) => (
    <div className="chat-room-container">
        <Row className="chat-header">
            <Col sm={12}>
                <h2>Chat Room</h2>
            </Col>
        </Row>
        <Row className="message-container">
            <Col sm={12}>
                <MessageContainer messages={messages} />
            </Col>
        </Row>
        <Row className="send-message-container">
            <Col sm={12}>
                <SendMessageForm sendMessage={sendMessage} />
            </Col>
        </Row>
    </div>
);

export default ChatRoom;
