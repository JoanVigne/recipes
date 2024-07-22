import React, { useState } from "react";
import "./formNewRecipe.css";
import { db, storage } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import DropZone from "./Atoms/DropZone";
const FormNewRecipe = ({ closeModal }) => {
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: [],
    instructions: "",
    postedBy: "",
  });

  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
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
  // IMAGE
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };
  // IMAGE
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      recipe.title.trim() === "" ||
      recipe.ingredients.length === 0 ||
      recipe.instructions.trim() === "" ||
      recipe.postedBy.trim() === ""
    ) {
      console.error("Please fill all the fields");
      setPasswordMessage("Formulaire incomplet.");
      console.log(imageFile);
      return;
    }
    if (password !== process.env.REACT_APP_CREATE_RECIPE_PASSWORD) {
      console.error("Incorrect password");
      setPasswordMessage("Incorrect password");
      console.log(imageFile);
      return;
    }

    try {
      // Assuming `imageFile` is the File object you get from the file input
      // and `imagePreviewUrl` is the state variable holding the image's data URL
      if (!imageFile) {
        console.error("Please add an image");
        setPasswordMessage("Déposer une photo.");
        return;
      }

      const storageRef = ref(storage, `recipes/${imageFile.name}`);
      const uploadTask = await uploadBytesResumable(storageRef, imageFile);

      // Get the URL of the uploaded file
      const imageUrl = await getDownloadURL(uploadTask.ref);
      const newrecipe = {
        ...recipe,
        imageUrl,
        createdAt: new Date(),
      };
      // Include the imageUrl in the document you're adding to Firestore
      await addDoc(collection(db, "recipes"), newrecipe);
      console.log("Recipe added successfully");

      // add to session storage
      let existingRecipes = sessionStorage.getItem("recipes");
      existingRecipes = existingRecipes ? JSON.parse(existingRecipes) : [];
      existingRecipes.unshift(newrecipe);
      sessionStorage.setItem("recipes", JSON.stringify(existingRecipes));
      // Reset the form or provide further user feedback
      setRecipe({ title: "", ingredients: "", instructions: "", postedBy: "" });
      setImageFile(null); // Assuming you have a state to hold the file
      setImagePreviewUrl(""); // Reset the image preview URL
      closeModal(); // Close the modal on success
      setShowSuccessModal(true);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Error adding recipe: ", error);
      // Handle errors, e.g., show an error message to the user
    }
  };

  return (
    <aside className="modal">
      {showSuccessModal && <div className="success-modal">Recette créée !</div>}
      <form onSubmit={handleSubmit}>
        <FontAwesomeIcon
          icon={faTimes}
          onClick={closeModal}
          className="closeModal"
        />
        <div className="container-inline">
          <label htmlFor="title">Recette:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={recipe.title}
            onChange={handleChange}
          />
        </div>
        <div className="containerIngredientInputIconList">
          <label htmlFor="ingredients">Ingredients:</label>
          <div className="ingredientAndAdd">
            <input
              type="text"
              id="ingredients"
              value={recipe.currentIngredient || ""}
              onChange={(e) => handleIngredientChange(e.target.value)}
              placeholder="Example: 100g de farine"
              onKeyDown={(e) => {
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
        </div>
        <p className="ingredientList">
          {recipe.ingredients.length > 0 &&
            recipe.ingredients.map((ingredient, index) => (
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
        <label htmlFor="instructions">Instructions:</label>
        <textarea
          id="instructions"
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
        />
        <div className="containerPreviewAndRemove">
          {imagePreviewUrl ? (
            <>
              <img
                className="imagePreview"
                src={imagePreviewUrl}
                alt="Preview"
              />
              <button
                className="changeImage"
                onClick={() => {
                  setImageFile(null);
                  setImagePreviewUrl("");
                }}
              >
                Changer d'image
              </button>
            </>
          ) : (
            <>
              <DropZone handleFileChange={handleFileChange} />
              {/*    <div className="container-inline">
                <label htmlFor="image"></label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={(e) => handleFileChange(e)}
                />
              </div> */}
            </>
          )}
        </div>

        <div className="container-inline">
          <label htmlFor="postedBy">Posté par:</label>
          <input
            type="text"
            id="postedBy"
            name="postedBy"
            value={recipe.postedBy}
            onChange={handleChange}
          />
        </div>
        <div className="container-inline">
          <label htmlFor="password">Mot de passe:</label>

          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <p className="passwordMessage">{passwordMessage}</p>
        <input type="submit" value="Save Recipe" />
      </form>
    </aside>
  );
};

export default FormNewRecipe;
