import React, {useEffect, useState} from "react";
import Axios from "axios";
import {Button, Form, Container} from "react-bootstrap";
import {useNavigate} from "react-router";
import { User } from "../interfaces/User.interface";
import { API_URL } from '../constants';
import LoginModal from "./loginModal";

function sendRegisterPetRequest (name : string, birth : Date, address : string, phoneNumber: string, clinicNumber : string, description : string, tag : string, jwt : string) {
    return Axios.post(`${API_URL}/pet`, {name, birth, address, phoneNumber, clinicNumber, description, tag,},{
    headers: {
        'authorization': jwt
      }})
} 

export default function RegisterPet({user,jwt} : {user : User|null , jwt : string}) {
    const [name, setName] = useState("");
    const [birth, setBirth] = useState(new Date());
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [clinicNumber, setClinicNumber] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState("");
    const [showLoginModal, setShowLoginModal] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        if ( jwt === ""){
            setShowLoginModal(true)
          
        }
        return () => {}
      })

      console.log(birth.toLocaleDateString())

    return (
        <Container>
            <Form className="Auth-form">
                <Form.Group className="mb-3" controlId="upload_form">
                    <Form.Label className="text-white">Nom de l'animal</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="nom"
                        autoFocus
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="upload_form">
                    <Form.Label className="text-white">Date de naissance de l'animal</Form.Label>
                    <Form.Control
                        required
                        type="date"
                        placeholder="aaaa-mm-jj"
                        autoFocus
                        value={birth.toLocaleDateString('en-CA')}
                        onChange={(e) => {
                            setBirth(new Date(e.target.value));
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="upload_form">
                    <Form.Label className="text-white">Adresse du domicile de l'animal</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="adresse"
                        autoFocus
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="upload_form">
                    <Form.Label className="text-white">Numéro de téléphone du propriétaire</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="numéro de téléphone"
                        autoFocus
                        value={phoneNumber}
                        onChange={(e) => {
                            setPhoneNumber(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="upload_form">
                    <Form.Label className="text-white">Numéro de la clinique vétérinaire</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="numéro de la clinique vétérinaire"
                        autoFocus
                        value={clinicNumber}
                        onChange={(e) => {
                            setClinicNumber(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="upload_form">
                    <Form.Label className="text-white">Description / Spécificités</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="description / spécificités"
                        autoFocus
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="upload_form">
                    <Form.Label className="text-white">Tatouage / Puce</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="tatouage / puce"
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
                        sendRegisterPetRequest(name, birth, address, phoneNumber, clinicNumber, description, tag, jwt).then(() => {
                            navigate('/pet');
                        })
                        .catch(() => {
                            console.log("error");
                        });
                    }}>
                        Créer son animal
                    </Button>
                </div>
            </Form>
            <LoginModal show={showLoginModal} />
        </Container>
    );
}