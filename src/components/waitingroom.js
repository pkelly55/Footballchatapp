import { Form, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";

const WaitingRoom = ({ joinChatRoom }) => {
    const [username, setUsername] = useState('');
    const [chatroom, setChatroom] = useState('');

    return (
        <div className="waiting-room-container"> {/* Adding the custom class for styling */}
            <Form onSubmit={e => {
                e.preventDefault();
                joinChatRoom({ username, chatroom });
            }}>
                <Row className='px-5 my-5'>
                    <Col sm={12}>
                        <Form.Group>
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                                placeholder='Enter your username'
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                            />
                            <Form.Label>Chatroom:</Form.Label>
                            <Form.Control
                                placeholder='Enter chatroom name'
                                value={chatroom}
                                onChange={e => setChatroom(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col sm={12}>
                        <Button variant="success" type="submit">Join Chat</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default WaitingRoom;
