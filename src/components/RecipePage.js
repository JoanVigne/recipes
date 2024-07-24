import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./recipePage.css";
import Recipe from "./Atoms/Recipe";

export default function RecipePage() {
  let { id } = useParams();
  // Use the id to fetch or identify the recipe
  const [recipe, setRecipe] = useState(null);
  useEffect(() => {
    // Fetch the recipe with the id
    const myRecipe = sessionStorage.getItem("recipes");
    if (myRecipe) {
      const recipe = JSON.parse(myRecipe).find((r) => r.id === id);
      setRecipe(recipe);
    }
  }, [id]);
  return (
    <div className="container-recipe-alone">
      {recipe ? (
        <Recipe recipe={recipe} />
      ) : (
        "Cette recette n'est pas disponible ici pour le moment ..."
      )}
      {/* Display the recipe */}
    </div>
  );
}
