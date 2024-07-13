import React, { useState } from "react";
import "./formNewRecipe.css";
import { db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const FormNewRecipe = () => {
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: "",
    instructions: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

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
      setRecipe({ title: "", ingredients: "", instructions: "" });
      setIsModalOpen(false); // Close the modal on success
    } catch (error) {
      console.error("Error adding recipe: ", error);
      // Handle errors, e.g., show an error message to the user
    }
  };

  const openModal = () => setIsModalOpen(!isModalOpen);
  const closeModal = () => setIsModalOpen(false);

  return (
    <aside className="newRecipe">
      <button onClick={openModal}>
        {isModalOpen ? "Close new recipe" : "Create new recipe"}
      </button>
      {isModalOpen && (
        <div className="modal">
          <form onSubmit={handleSubmit}>
            <button type="button" onClick={closeModal}>
              Close
            </button>
            <label htmlFor="title">name:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={recipe.title}
              onChange={handleChange}
            />
            <label htmlFor="ingredients">Ingredients:</label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={recipe.ingredients}
              onChange={handleChange}
            />
            <label htmlFor="ingredients">Instructions:</label>
            <textarea
              id="instructions"
              name="instructions"
              value={recipe.instructions}
              onChange={handleChange}
            />
            <label htmlFor="password">Password:</label>
            <div className="passwordAndMessage">
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
      )}
    </aside>
  );
};

export default FormNewRecipe;
