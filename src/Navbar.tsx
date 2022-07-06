import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Nav, NavDropdown } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router';
import { User } from './interfaces/User.interface';
import { faCirclePlus, faQrcode } from '@fortawesome/free-solid-svg-icons';

export default function NavbarComponent({connected, activePage, user, disconnect} : {connected: boolean, activePage : string, user: User|null, disconnect : () => void}) {
    
    let navigate = useNavigate()
    let profile 
    if (connected && user!=null) {
        profile = <NavDropdown title={user.firstName + " " + user.lastName} id="collasible-nav-dropdown">
        <NavDropdown.Item onClick={() => {disconnect() ; navigate("/")}}>Déconnexion</NavDropdown.Item>
      </NavDropdown>
    } 
    else {
        profile = <Nav.Link href="/login">Se connecter</Nav.Link>
    }

    console.log("path : ", activePage)

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
          <Navbar.Brand href="/"> <FontAwesomeIcon icon={faQrcode}/> QR-Pets</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/" className={'bg-dark' + (activePage == "/" ? " text-light" : "")}>Accueil</Nav.Link>
              <Nav.Link href="/pet" className={activePage == "/pet" ? "text-light" : ""}>Mes animaux</Nav.Link>
              <Nav.Link href="/registerPet" className={activePage == "/registerPet" ? "text-light" : ""} > <FontAwesomeIcon icon={faCirclePlus} /> Ajouter un animal</Nav.Link>
              
            </Nav>
            <Nav>
                {profile}
            </Nav>
          </Navbar.Collapse>
          </Container>
        </Navbar>
    )
}