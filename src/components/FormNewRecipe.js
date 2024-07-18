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
    if (password !== process.env.REACT_APP_CREATE_RECIPE_PASSWORD) {
      console.error("Incorrect password");
      setPasswordMessage("Incorrect password");
      console.log(imageFile);
      return;
    }
    try {
      // Assuming `imageFile` is the File object you get from the file input
      // and `imagePreviewUrl` is the state variable holding the image's data URL
      if (imageFile) {
        const storageRef = ref(storage, `recipes/${imageFile.name}`);
        const uploadTask = await uploadBytesResumable(storageRef, imageFile);

        // Get the URL of the uploaded file
        const imageUrl = await getDownloadURL(uploadTask.ref);

        // Include the imageUrl in the document you're adding to Firestore
        await addDoc(collection(db, "recipes"), {
          ...recipe,
          imageUrl,
          createdAt: new Date(),
        });
        console.log("Recipe added successfully");
      } else {
        // Handle case where no image is selected, if necessary
        await addDoc(collection(db, "recipes"), {
          ...recipe,
        });

        console.log("Recipe added without an image");
      }
      // add to session storage
      let existingRecipes = sessionStorage.getItem("recipes");
      existingRecipes = existingRecipes ? JSON.parse(existingRecipes) : [];
      existingRecipes.unshift(recipe);
      sessionStorage.setItem("recipes", JSON.stringify(existingRecipes));
      // Reset the form or provide further user feedback
      setRecipe({ title: "", ingredients: "", instructions: "", postedBy: "" });
      setImageFile(null); // Assuming you have a state to hold the file
      setImagePreviewUrl(""); // Reset the image preview URL
      closeModal(); // Close the modal on success
    } catch (error) {
      console.error("Error adding recipe: ", error);
      // Handle errors, e.g., show an error message to the user
    }
  };

  return (
    <aside className="modal">
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
              <div className="container-inputfile-title">
                <label htmlFor="image">ou de maniére plus classique ici</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={(e) => handleFileChange(e)}
                />
              </div>
            </>
          )}
        </div>

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
    </aside>
  );
};

export default FormNewRecipe;
