import Axios from "axios";
import { useState } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router";
import { Pet } from "../interfaces/Pet.interface";
import { User } from "../interfaces/User.interface";

export default function PetViewer ({user, jwt} : {user: User|null, jwt : string}){
    const  { userId, petId } = useParams();
    const [pet, setPet] = useState<Pet|null>();

    Axios.get("http://127.0.0.1:3000/pet?id="+ petId)
    .then ((response: any) => {
      setPet(response.data)
    })
    .catch((error) => {
        console.log(error);
    });

    let content ; 
    if (pet){
        content = <Card className="mt-3" bg="secondary" style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{pet.name}</Card.Title>
          <Card.Text>
            {pet.description}
          </Card.Text>
        </Card.Body>
      </Card>
    }
    else {
      content= <p>loading ...</p>
    }
    return content
}