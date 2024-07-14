import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ModalSearchedRecipes = ({ recipes }) => {
  /*  const closeModal = () => {
    setSearchedRecipe("");
  }; */
  return (
    <div className="modal">
      <FontAwesomeIcon
        icon={faTimes}
        /*        onClick={closeModal} */
        className="closeModal"
      />
      ;
      <div className="modal-content">
        <h2>Modal Title</h2>
        <p>Modal content goes here</p>
      </div>
    </div>
  );
};

export default ModalSearchedRecipes;
