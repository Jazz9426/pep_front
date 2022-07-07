import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';



export default function LoginModal ({show} : {show : boolean}) {

    let navigate = useNavigate();

    function redirectToHome (){
        navigate("/")
    }

    function redirectToLogin (){
        navigate("/login")
    }
    
    return (   
        
        <Modal show={show} onHide={redirectToHome}>
          <Modal.Header closeButton>
            <Modal.Title><FontAwesomeIcon style={{color:'red'}} icon={faTriangleExclamation} />  Impossible d'accéder à cette page</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Pour accéder à cette page, il faut être connecté à un compte.</p>
            <p>Connectez-vous !</p>
          </Modal.Body>
          <Modal.Footer>

            <Button variant="secondary" onClick={redirectToHome}>
              Fermer
            </Button>
            <Button variant="primary" onClick={redirectToLogin}>
              Se connecter
            </Button>
          </Modal.Footer>
        </Modal>
    )
}