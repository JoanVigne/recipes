import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "./containerRecipes.css";
import Recipe from "./Atoms/Recipe";

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
  function openRecipe(recipe) {
    console.log("openRecipe", recipe);
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="containerAllRecipes">
      {recipes.map((recipe) => (
        <Recipe
          key={recipe.id ? recipe.id : recipe.createAt}
          recipe={recipe}
          openRecipe={openRecipe}
        />
      ))}
    </div>
  );
}
