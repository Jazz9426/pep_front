import React, {useState} from "react";
import Axios from "axios";
import {Button, Form, Container} from "react-bootstrap";
import { useNavigate } from "react-router";


function sendLoginRequest (email : string, password: string) {
    return Axios.post("http://127.0.0.1:3000/login", {email, password})
} 

export default function Login({changeUser} : {changeUser: (jwt: string, userId : number) => void}) {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    let navigate = useNavigate();

    return (
        <Container>
            <Form className="Auth-form">
                <Form.Group className="mb-3" controlId="upload_form">
                    <Form.Label>Email</Form.Label>
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
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="password"
                        autoFocus
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </Form.Group>

                <a href="/register" className="text-secondary">Pas encore de compte ? Se créer un compte</a>

                <div className="d-grid gap-2 mt-3">
                <Button type="submit" className="btn btn-primary" onClick={(e) => {
                        e.preventDefault();
                        sendLoginRequest(email, password).then((response: any) => {
                            console.log("passe par la")
                            changeUser(response.data.token, response.data.userId)
                            navigate('/pet');
                        })
                        .catch(() => {
                            console.log("error");
                        });
                    }}>
                        Connexion
                    </Button>
                </div>
            </Form>
        </Container>
    );
}