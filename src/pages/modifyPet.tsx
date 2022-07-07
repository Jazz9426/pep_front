import Axios from 'axios';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router';
import { Pet } from '../interfaces/Pet.interface';
import { API_URL } from '../constants';
import { faCalendarDays, faHouseUser, faPaw, faPhone, faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function ModifyPet ({userId, jwt, pet, closeModal, refreshList} : {userId : number, jwt : string, pet : Pet|null, closeModal : () => void, refreshList : () => void}) {
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [birth, setBirth] = useState(new Date());
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [clinicNumber, setClinicNumber] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState("");
    let navigate = useNavigate();

    function updatePet () {
        Axios.put(`${API_URL}/pet?id=` + id, 
            {name : name, birth : birth, address : address, phoneNumber : phoneNumber, clinicNumber : clinicNumber, description : description, tag : tag},
            {
                headers: {
                  'authorization': jwt
                }
            }
        )
        .then(() => {
            refreshList()
            closeModal()
        })
        .catch((error) => {
            console.log(error);
            closeModal()
        });

    }

    function deletePet () {
        Axios.delete(`${API_URL}/pet?id=` + id, {
                headers: {
                  'authorization': jwt
                }
            }
        )
        .then(() => {
            refreshList()
            closeModal()
        })
        .catch((error) => {
            console.log(error);
            closeModal()
        });

    }

    if (pet !== null){
        if (id !== pet.id) {
            setId(pet.id)
            setName(pet.name)
            setBirth(new Date(pet.birth))
            setAddress(pet.address)
            setPhoneNumber(pet.phoneNumber)
            setClinicNumber(pet.clinicNumber)
            setDescription(pet.description)
            setTag(pet.tag)
        }

        console.log(typeof birth)
    
    return (   
        
        <Modal show={true} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title> <FontAwesomeIcon icon={faPaw} /> &nbsp; {pet.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="upload_form">
                        <Form.Label> <FontAwesomeIcon icon={faHouseUser} /> &nbsp; Nom de l'animal</Form.Label>
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
                        <Form.Label><FontAwesomeIcon icon={faCalendarDays} />&nbsp; Date de naissance de l'animal</Form.Label>
                        <Form.Control
                            required
                            type="date"
                            placeholder="jj/mm/aaaa"
                            autoFocus
                            value={birth.toLocaleDateString('en-CA')}
                            onChange={(e) => {
                                console.log("here")
                                setBirth(new Date(e.target.value));
                            }}
                        />
                </Form.Group>
                <Form.Group className="mb-3" controlId="upload_form">
                        <Form.Label> <FontAwesomeIcon icon={faHouseUser} />&nbsp; Adresse du domicile de l'animal</Form.Label>
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
                        <Form.Label><FontAwesomeIcon icon={faPhone} />&nbsp; Numéro de téléphone du propriétaire</Form.Label>
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
                        <Form.Label><FontAwesomeIcon icon={faPhone} />&nbsp; Numéro de la clinique vétérinaire</Form.Label>
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
                        <Form.Label>Description / Spécificités</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="description"
                            autoFocus
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                        />
                </Form.Group>
                <Form.Group className="mb-3" controlId="upload_form">
                        <Form.Label><FontAwesomeIcon icon={faTag}/>&nbsp; Tatouage / Puce</Form.Label>
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
            </Form>
            
            <div className='text-center'>
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${API_URL}/${userId}/${pet.id}`} /> 
            </div>

          </Modal.Body>
          <Modal.Footer>
                <Button variant="danger" onClick={deletePet}>
                Supprimer
                </Button>
            <Button variant="secondary" onClick={closeModal}>
              Fermer
            </Button>
            <Button variant="primary" onClick={updatePet}>
              Enregistrer
            </Button>
          </Modal.Footer>
        </Modal>

    );
    } else 
        return(<></>)
}