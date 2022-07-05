import React, {useState} from "react";
import Axios from "axios";
import {Button, Form, Container} from "react-bootstrap";
import {useNavigate} from "react-router";

function sendRegisterRequest (firstName : string, lastName : string, email : string, password: string) {
    return Axios.post("http://127.0.0.1:3000/register", {firstName, lastName, email, password})
} 

export default function Register() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
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
                <Form.Group className="mb-3" controlId="upload_form">
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="prénom"
                        autoFocus
                        value={firstName}
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="upload_form">
                    <Form.Label>Nom de famille</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="nom de famille"
                        autoFocus
                        value={lastName}
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                    />
                </Form.Group>

                <a href="/login" className="text-secondary">Déja un compte ? Se connecter</a>

                <div className="d-grid gap-2 mt-3">
                <Button type="submit" className="btn btn-primary" onClick={(e) => {
                        e.preventDefault();
                        sendRegisterRequest(firstName, lastName, email, password).then(() => {
                            navigate('/login');
                        })
                        .catch(() => {
                            console.log("error");
                        });
                    }}>
                        Créer son compte
                    </Button>
                </div>
            </Form>
        </Container>
    );
}