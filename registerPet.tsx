import React, {useState} from "react";
import Axios from "axios";
import {Button, Form, Container} from "react-bootstrap";
import {useNavigate} from "react-router";

function sendRegisterPetRequest (name : string, age : string, address : string, phoneNumber: string, clinicNumber : string, tag : string) {
    return Axios.post("http://127.0.0.1:3000/registerPet", {name, age, address, phoneNumber, clinicNumber, tag})
} 

export default function RegisterPet() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [clinicNumber, setClinicNumber] = useState("");
    const [tag, setTag] = useState("");
    let navigate = useNavigate();

    return (
        <Container>
            <Form className="Auth-form">
                <Form.Group className="mb-3" controlId="upload_form">
                    <Form.Label>name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="name"
                        autoFocus
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="upload_form">
                    <Form.Label>age</Form.Label>
                    <Form.Control
                        required
                        type="double"
                        placeholder="age"
                        autoFocus
                        value={age}
                        onChange={(e) => {
                            setAge(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="upload_form">
                    <Form.Label>address</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="address"
                        autoFocus
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="upload_form">
                    <Form.Label>phoneNumber</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="phoneNumber"
                        autoFocus
                        value={phoneNumber}
                        onChange={(e) => {
                            setPhoneNumber(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="upload_form">
                    <Form.Label>clinicNumber</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="clinicNumber"
                        autoFocus
                        value={clinicNumber}
                        onChange={(e) => {
                            setClinicNumber(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="upload_form">
                    <Form.Label>tag</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="tag"
                        autoFocus
                        value={tag}
                        onChange={(e) => {
                            setTag(e.target.value);
                        }}
                    />
                </Form.Group>

                <div className="d-grid gap-2 mt-3">
                <Button type="submit" className="btn btn-primary" onClick={(e) => {
                        e.preventDefault();
                        sendRegisterPetRequest(name, age, address, phoneNumber, clinicNumber, tag).then(() => {
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