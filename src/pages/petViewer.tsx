import Axios from "axios";
import { useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useParams } from "react-router";
import { Pet } from "../interfaces/Pet.interface";
import { User } from "../interfaces/User.interface";
import { API_URL } from '../constants';
import { faHouseUser, faPaw, faPhone, faTag } from "@fortawesome/free-solid-svg-icons";
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
        <Card className="mt-3 mx-2 h-100" bg="white">
            
            <Card.Body>
            <div className="d-flex justify-content-center">
              <a href="#" className="avatar avatar-xl rounded-circle">
                <img src="./../../paw.png"/>
              </a>
            </div>
            <div className="text-center my-6">
            <a href="#" className="d-block h5 mb-0">{pet.name}</a>
            <span className="d-block text-sm text-muted">{formatElapsedTime(new Date(pet.birth))}</span>
          </div>
              <Card.Title> 
              </Card.Title>
              <Card.Text>
                <div className="text-center"><hr/>
                  <p><FontAwesomeIcon icon={faHouseUser} /> &nbsp; Adresse du domicile de l'animal : <br></br>{pet.address}</p><hr/>
                  <p><FontAwesomeIcon icon={faPhone} /> &nbsp; Numéro de téléphone du propriétaire : <br></br>{pet.phoneNumber}</p><hr/>
                  <p><FontAwesomeIcon icon={faPhone} /> &nbsp; Numéro de la clinique vétérinaire : <br></br>{pet.clinicNumber}</p><hr/>
                  <p><FontAwesomeIcon icon={faTag} /> &nbsp; Tatouage / Puce : <br></br>{pet.tag}</p><hr/>
                  <p>{pet.description}</p>
              </div>
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