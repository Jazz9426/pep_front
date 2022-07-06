import { Container } from "react-bootstrap";
import "./../app/App.css";



export default function Home() {
    return (
        <div /*className="header"*/>
        <Container >
            
        <h1 className="text-center ">QR-Pets</h1>

        <div className="row py-3 mt-6">
        <div className="col-xs-12 col-md-6">
                <img src="vet.jpg" className="w-100"/>
            </div>
            <div className="col-xs-12 col-md-6 d-flex align-items-center text-center">
                <p>Ce site est le résultat d'un Projet d'Enrichissement Personnel. Il allie mes deux passions : l’environnement animalier et l’informatique. A travers ce projet je souhaite faire avancée la cause animale, encore trop peu prise en compte de nos jours.</p>
            </div>

        </div>
        <hr className="d-block d-sm-none"/>
        <div className="row py-3">
        <div className="col-xs-12 col-md-6 d-flex align-items-center text-center">
                <p>Ce site permet à tout utilisateur d’entrer des informations sur son animal pour en créer une fiche. Le site permet par la suite d’imprimer un QR code, dédié à l’animal, qui, une fois scanné, permet d’accéder aux informations enregistrées. J'ai réaliser ce projet dans un but d'aider les particuliers possédant un animal, en incluant le QR code au collier de celui-ci. Toute personne peut venir en aide à l’animal, qu’il soit en danger ou perdu.</p>
            </div>

            <div className="col-xs-12 col-md-6">
                <img src="vet2.png" className="w-100"/>
            </div>

            
        </div>

        </Container>
        </div>
    )
}
