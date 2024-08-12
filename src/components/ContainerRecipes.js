import { useEffect, useState } from "react";

import "./containerRecipes.css";
import Recipe from "./Atoms/Recipe";
import { fetchRecipes } from "../utils/fetchs";

export default function ContainerRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cachedRecipes = sessionStorage.getItem("recipes");
    if (cachedRecipes) {
      const sortedRecipes = JSON.parse(cachedRecipes).sort((a, b) => {
        // Both recipes have createdAt, sort by timestamp
        if (a.createdAt && b.createdAt) {
          return b.createdAt - a.createdAt;
        }
        // Recipe a does not have createdAt, put it after b
        if (!a.createdAt) {
          return 1; // Move a to the end
        }
        // Recipe b does not have createdAt, put it after a
        if (!b.createdAt) {
          return -1; // Keep a before b
        }
        // In case both are missing createdAt, maintain original order
        return 0;
      });

      setRecipes(sortedRecipes);
      setLoading(false);
    } else {
      setRecipes(fetchRecipes);
      setLoading(false);
    }
  }, []);

  /*   const fetchRecipes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "recipes"));
      const fetchedRecipes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      fetchedRecipes.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return b.createdAt - a.createdAt;
        }
        if (!a.createdAt) {
          return 1;
        }
        if (!b.createdAt) {
          return -1;
        }
        return 0;
      });
      setRecipes(fetchedRecipes);
      sessionStorage.setItem("recipes", JSON.stringify(fetchedRecipes));
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }; */

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h2 className="styled-title">
        Pour que les recettes de grand-mère
        <br />
        se transmettent
        <br />
        de génération en génération...
      </h2>
      <h2>Les nouvelles recettes</h2>
      <div className="containerAllRecipes container-new-recipes">
        {/* ici les recettes de 0 à 3 dernieres */}
        {recipes.slice(0, 3).map((recipe) => (
          <Recipe recipe={recipe} detailsOpen={false} key={recipe.id} />
        ))}
      </div>
      <div className="containerAllRecipes">
        {/* ici les autres */}
        {recipes.slice(3).map((recipe) => (
          <Recipe recipe={recipe} detailsOpen={false} key={recipe.id} />
        ))}
      </div>
    </>
  );
}
