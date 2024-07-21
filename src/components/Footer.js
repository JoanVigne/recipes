import "./headerfooter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer>
      <p>
        <FontAwesomeIcon icon={faInfoCircle} />
        <br />
        Pour modifier ou supprimer une recette, <br /> envoie moi un message
        directement sur whatsapp.
      </p>

      <p>© 2021, All rights reserved.</p>
    </footer>
  );
}
