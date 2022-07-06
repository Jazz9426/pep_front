import React, {useEffect, useState} from "react";
import Axios from "axios";
import { User } from "../interfaces/User.interface";
import { Pet } from "../interfaces/Pet.interface";
import { useNavigate } from "react-router";
import { Container, Card, Button } from "react-bootstrap";
import ModifyPet from "./modifyPet";
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API_URL, FRONT_URL } from '../constants';
import LoginModal from "./loginModal";
import moment from 'moment'
import formatElapsedTime from "../utils/formatElapsedTime";




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
      <div className="row d-flex card-group">
      {
        petList.map ((element : Pet, index : number) => (
          <div className="col-xs-12 col-md-4 py-3">
          <Card key={index} className="mt-3 mx-2 h-100" bg="secondary">
            
            <Card.Body>
              <Card.Title> 
                <FontAwesomeIcon icon={faPaw} /> 
                {element.name} <span style={{fontSize: 12}}>- {formatElapsedTime(new Date(element.birth))}</span>
              </Card.Title>
              <Card.Text>
              <p>Adresse du domicile de l'animal : {element.address}</p>
              <p>Numéro de téléphone du propriétaire : {element.phoneNumber}</p>
              <p>Numéro de la clinique vétérinaire : {element.clinicNumber}</p>
              <p>Tatouage / Puce : {element.tag}</p>
              <p>{element.description}</p>
              </Card.Text>
            </Card.Body>
            <Card.Footer className="row d-flex align-items-center">
              <div className="col-6 align-middle">
                <Button variant="primary" onClick={() => {setEditedPet(element)}}>Informations</Button>
              </div>
              <div className="col-6 d-flex justify-content-end">
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=${FRONT_URL}/${user ? user.id : -1}/${element.id}`} />
              </div>            
            </Card.Footer>
          </Card>
          </div>
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