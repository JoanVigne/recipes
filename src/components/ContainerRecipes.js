import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "./containerRecipes.css";

export default function ContainerRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cachedRecipes = sessionStorage.getItem("recipes");
    if (cachedRecipes) {
      setRecipes(JSON.parse(cachedRecipes));
      setLoading(false);
    } else {
      fetchRecipes();
    }
  }, []);
  function openRecipe(recipe) {
    console.log("openRecipe", recipe);
  }
  const fetchRecipes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "recipes"));
      const fetchedRecipes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecipes(fetchedRecipes);
      sessionStorage.setItem("recipes", JSON.stringify(fetchedRecipes));
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="containerAllRecipes">
      {recipes.map((recipe) => (
        <div
          className="containerRecipe"
          key={recipe.id ? recipe.id : recipe.createAt}
          onClick={() => openRecipe(recipe)}
        >
          <img
            className="imageRecipe"
            alt={"photo de " + recipe.title + " introuvable"}
            src={recipe.imageUrl ? recipe.imageUrl : ""}
          />
          <div className="containerText">
            <h3 className="titleAndPostedBy">
              {recipe.title}
              <span>{recipe.postedBy && `Posté par ${recipe.postedBy}`}</span>
            </h3>
            <ul>
              <h3>Ingrédients</h3>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <p> {recipe.instructions}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
