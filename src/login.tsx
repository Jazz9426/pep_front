import React, {useState} from "react";
import Axios from "axios";
import {Button, Form, Container} from "react-bootstrap";
import {useNavigate} from "react-router";

function sendLoginRequest (email : string, password: string) {
    return Axios.post("http://127.0.0.1:3000/login", {email, password})
} 

export default function Login() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    let navigate = useNavigate();

    return (
        <Container>
            <Form className="Auth-form">
                <Form.Group className="mb-3" controlId="upload_form">
                    <Form.Label>email</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="email"
                        autoFocus
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="upload_form">
                    <Form.Label>password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                        autoFocus
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </Form.Group>
                <div className="d-grid gap-2 mt-3">
                <Button type="submit" className="btn btn-primary" onClick={(e) => {
                        e.preventDefault();
                        sendLoginRequest(email, password).then(() => {
                            navigate('/pets');
                        })
                        .catch(() => {
                            console.log("error");
                        });
                    }}>
                        Submit
                    </Button>
                </div>
            </Form>
        </Container>
    );
}