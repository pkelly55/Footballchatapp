import React, { useState } from 'react';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';

const SendMessageForm = ({ sendMessage }) => {
    const [msg, setMessage] = useState('');

    return (
        <Form onSubmit={e => {
            e.preventDefault();
            sendMessage(msg);
            setMessage('');
        }}>
            <InputGroup className="mb-3">
                <InputGroup.Text>Chat</InputGroup.Text>
                <FormControl
                    onChange={e => setMessage(e.target.value)}
                    value={msg}
                    placeholder="Type your message"
                />
                <Button variant="success" type="submit" disabled={!msg}>
                    Send
                </Button>
            </InputGroup>
        </Form>
    );
}

export default SendMessageForm;
