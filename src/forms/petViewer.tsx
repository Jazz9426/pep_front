import Axios from "axios";
import { useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useParams } from "react-router";
import { Pet } from "../interfaces/Pet.interface";
import { User } from "../interfaces/User.interface";
import { API_URL } from '../constants';
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import formatElapsedTime from "../utils/formatElapsedTime";

export default function PetViewer ({user, jwt} : {user: User|null, jwt : string}){
    const  { userId, petId } = useParams();
    const [pet, setPet] = useState<Pet|null>();

    Axios.get(`${API_URL}/pet?id=`+ petId)
    .then ((response: any) => {
      setPet(response.data)
    })
    .catch((error) => {
        console.log(error);
    });

    let content ; 
    if (pet){
        content = 
        <Card className="mt-3 flex-fill flex-grow-1" bg="secondary" >
        <Card.Body>
        <Card.Title> 
                <FontAwesomeIcon icon={faPaw} /> 
                {pet.name} <span style={{fontSize: 12}}>- {formatElapsedTime(new Date(pet.birth))}</span>
              </Card.Title>
          <Card.Text>
            <p>Adresse du domicile de l'animal : {pet.address}</p>
            <p>Numéro de téléphone du propriétaire : {pet.phoneNumber}</p>
            <p>Numéro de la clinique vétérinaire : {pet.clinicNumber}</p>
            <p>Tatouage / Puce : {pet.tag}</p>
            <p>{pet.description}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    }
    else {
      content= <p>loading ...</p>
    }
    return (
      <Container fluid className="d-flex flex-column">
        {content}
      </Container>
    )
}