import "./headerfooter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer>
      <p>
        <FontAwesomeIcon icon={faInfoCircle} />
        Pour modifier une recette, supprimer une recette, ou ajouter et modifier
        une photo dans la section "Créateurs", envoie moi un message directement
        sur whatsapp.
      </p>

      <p>© 2024, All rights reserved.</p>
    </footer>
  );
}
