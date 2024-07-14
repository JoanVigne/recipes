import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./header.css";
import FormNewRecipe from "./FormNewRecipe";
import ModalSearchedRecipes from "./ModalSearchedRecipes";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const [searchedRecipe, setSearchedRecipe] = useState("");
  const closeModal = () => setIsModalOpen(false);
  function searchThisWord() {
    const cachedRecipes = sessionStorage.getItem("recipes");
    setRecipes(JSON.parse(cachedRecipes));
    const search = document.querySelector(".searchRecipeInput").value;
    if (search === "") {
      setIsInputOpen(false);
      return;
    }
    console.log(search);
    setSearchedRecipe(search);
    document.querySelector(".searchRecipeInput").value = "";
    setIsInputOpen(false);
  }
  return (
    <header>
      {searchedRecipe && <ModalSearchedRecipes recipes={recipes} />}

      <h1>Recette de famille</h1>
      {isModalOpen && <FormNewRecipe closeModal={closeModal} />}
      <nav>
        <a
          href="/create-recipe"
          className="createRecipeButton"
          onClick={(e) => {
            e.preventDefault();
            setIsModalOpen(!isModalOpen);
          }}
        >
          Créer une recette
        </a>
        <input
          className={`searchRecipeInput ${isInputOpen ? "active" : "inactive"}`}
          type="text"
          name="searchRecipe"
        />
        <a
          href="/search"
          className="search"
          onClick={(e) => {
            e.preventDefault();
            if (isInputOpen) {
              searchThisWord();
            } else {
              setIsInputOpen(!isInputOpen);
            }
          }}
        >
          <FontAwesomeIcon icon={faSearch} style={{ color: "white" }} />
        </a>
      </nav>
    </header>
  );
}
