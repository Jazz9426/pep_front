import React, {useState} from "react";
import Axios from "axios";
import {Button, Form, Container} from "react-bootstrap";
import { useNavigate } from "react-router";
import { API_URL } from '../constants';

function sendLoginRequest (email : string, password: string) {
    return Axios.post(`${API_URL}/login`, {email, password})
} 

export default function Login({changeUser} : {changeUser: (jwt: string, userId : number) => void}) {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    let navigate = useNavigate();

    function submitForm() : void {
        sendLoginRequest(email, password).then((response: any) => {
            console.log("passe par la")
            changeUser(response.data.token, response.data.userId)
            navigate('/pet');
        })
        .catch(() => {
            console.log("error");
        });
    }

    function submitFormClick(e : any) : void {
        e.preventDefault();
        submitForm()
    }

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
                        placeholder="mot de passe"
                        autoFocus
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </Form.Group>

                <a href="/register" className="text-secondary">Pas encore de compte ? Se créer un compte</a>

                <div className="d-grid gap-2 mt-3">
                    <Button type="submit" style={{cursor: "pointer"}} className="btn btn-primary" onTouchStart={submitForm} onClick={submitFormClick}>
                        Connexion
                    </Button>
                </div>
            </Form>
        </Container>
    );
}