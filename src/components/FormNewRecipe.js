import React, { useState } from "react";
import "./formNewRecipe.css";
import { db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const FormNewRecipe = ({ closeModal }) => {
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: [],
    instructions: "",
    postedBy: "",
  });

  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };
  // ingredients
  const handleIngredientChange = (value) => {
    setRecipe({ ...recipe, currentIngredient: value });
  };

  const addIngredientField = () => {
    if (!recipe.currentIngredient || recipe.currentIngredient.trim() === "") {
      return;
    }
    if (recipe.currentIngredient.trim() !== "") {
      setRecipe({
        ...recipe,
        ingredients: [...recipe.ingredients, recipe.currentIngredient],
        currentIngredient: "", // Clear the input field after adding
      });
    }
  };

  const removeIngredientField = (index) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients.splice(index, 1);
    setRecipe({ ...recipe, ingredients: newIngredients });
  };
  // ingredients
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== process.env.REACT_APP_CREATE_RECIPE_PASSWORD) {
      console.error("Incorrect password");
      setPasswordMessage("Incorrect password");
      console.log(process.env.REACT_APP_CREATE_RECIPE_PASSWORD);
      console.log("password", password);
      return;
    }
    try {
      await addDoc(collection(db, "recipes"), {
        ...recipe,
      });
      console.log("Recipe added successfully");
      // Reset the form or provide further user feedback
      setRecipe({ title: "", ingredients: "", instructions: "", postedBy: "" });
      closeModal(); // Close the modal on success
    } catch (error) {
      console.error("Error adding recipe: ", error);
      // Handle errors, e.g., show an error message to the user
    }
  };

  return (
    <aside className="newRecipe">
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <FontAwesomeIcon
            icon={faTimes}
            onClick={closeModal}
            className="closeModal"
          />
          <label htmlFor="title">Nom:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={recipe.title}
            onChange={handleChange}
          />
          <label htmlFor="ingredients">Ingredients:</label>
          <div className="ingredientAndAdd">
            <input
              type="text"
              value={recipe.currentIngredient}
              onChange={(e) => handleIngredientChange(e.target.value)}
              placeholder="Example: 100g de farine"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Prevent the form from being submitted
                  addIngredientField();
                }
              }}
            />
            <FontAwesomeIcon
              className="addIngredient"
              icon={faPlus}
              onClick={addIngredientField}
            />
          </div>
          <p className="ingredientList">
            {recipe.ingredients.map((ingredient, index) => (
              <span key={index} className="ingredientAndRemove">
                {ingredient}
                <FontAwesomeIcon
                  icon={faMinus}
                  onClick={() => removeIngredientField(index)}
                  className="remove"
                />
              </span>
            ))}
          </p>
          <label htmlFor="ingredients">Instructions:</label>
          <textarea
            id="instructions"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
          />
          <div className="containerLabelInput">
            <label htmlFor="postedBy">Posté par:</label>
            <input
              type="text"
              id="postedBy"
              name="postedBy"
              value={recipe.postedBy}
              onChange={handleChange}
            />
          </div>
          <div className="containerLabelInput">
            <label htmlFor="password">Password:</label>

            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />

            <p className="passwordMessage">{passwordMessage}</p>
          </div>

          <input type="submit" value="Save Recipe" />
        </form>
      </div>
    </aside>
  );
};

export default FormNewRecipe;
