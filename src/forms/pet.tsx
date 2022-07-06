import React, {useEffect, useState} from "react";
import Axios from "axios";
import { User } from "../interfaces/User.interface";
import { Pet } from "../interfaces/Pet.interface";
import { useNavigate } from "react-router";
import { Container, Card, Button } from "react-bootstrap";
import ModifyPet from "./modifyPet";
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API_URL } from '../constants';
import LoginModal from "./loginModal";


export default function PetComponent ({connected, user, jwt} : {connected: boolean, user: User|null, jwt : string}){
  const [petList, setPetList] = useState<Pet[]>([])
  const [loaded, setLoaded] = useState(false)
  const [editedPet, setEditedPet] = useState<Pet|null>(null)
  const [showLoginModal, setShowLoginModal] = useState(false);
  let navigate = useNavigate();
  
  function refreshList(){
    setPetList([])
    setLoaded(false)
    
  }

  useEffect(() => {
    if ( jwt === ""){
        setShowLoginModal(true)
      
    }
    return () => {}
  })

  if (!loaded && user) {
    Axios.get(`${API_URL}/petList?userId=`+ user.id, {
      headers: {
        'authorization': jwt
      }})
    .then ((response) => {
      let allPets : Pet[] = []
      response.data.forEach((element : Pet) => {
        allPets.push(element)
      });
      setLoaded(true)
      setPetList(allPets)
    })
  }
  return(
    <Container className="p-3">
      <div className="justify-content-xs-center row justify-content-md-start d-flex card-group">
      {
        petList.map ((element : Pet, index : number) => (
          <Card key={index} className="mt-3 mx-2 px-3 col-xs-10 col-md-6 rounded" bg="secondary">
            
            <Card.Body>
              <Card.Title> <FontAwesomeIcon icon={faPaw} /> {element.name} </Card.Title>
              <Card.Text>
                {element.description} 
              </Card.Text>
            </Card.Body>
            <Card.Footer className="row d-flex align-items-center">
              <div className="col-6 align-middle">
                <Button variant="primary" onClick={() => {setEditedPet(element)}}>Informations</Button>
              </div>
              <div className="col-6 d-flex justify-content-end">
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=${API_URL}/${user ? user.id : -1}/${element.id}`} />
              </div>            
            </Card.Footer>
          </Card>
        ))
      }
      </div>
      <ModifyPet refreshList={refreshList} userId={user ? user.id : -1} jwt={jwt} pet={editedPet} closeModal={() => {
        setEditedPet(null)
      } }/>
      <LoginModal show={showLoginModal} />
    </Container>
  )
}