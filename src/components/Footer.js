import { useState } from "react";
import FormNewRecipe from "./FormNewRecipe";
import "./headerfooter.css";

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  return (
    <footer>
      <button
        href="/create-recipe"
        className="createRecipeButton"
        onClick={(e) => {
          e.preventDefault();
          setIsModalOpen(!isModalOpen);
        }}
      >
        Créer une recette
      </button>
      <p>
        Pour supprimer une recette, <br /> envoie moi un message directement sur
        whatsapp.
      </p>
      {isModalOpen && <FormNewRecipe closeModal={closeModal} />}
      <p>© 2021, All rights reserved.</p>
    </footer>
  );
}
