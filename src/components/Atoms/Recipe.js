import IconLi from "./IconLi";
import "./recipe.css";
import React from "react";

export default function Recipe({ recipe }) {
  return (
    <div className="containerRecipe">
      {recipe.imageUrl ? (
        <img
          className="imageRecipe"
          alt={"photo de " + recipe.title}
          /*   onClick={() => window.open(recipe.imageUrl)} */
          src={recipe.imageUrl ? recipe.imageUrl : ""}
        />
      ) : (
        <div className="imageRecipe"></div>
      )}

      <div className="containerText">
        <div className="titleAndPostedBy">
          <h3>{recipe.title}</h3>
          <i>{recipe.postedBy && `Posté par ${recipe.postedBy}`}</i>
        </div>
        <h4>Ingrédients</h4>
        <ul>
          {recipe.ingredients.map((ingredient, index) => {
            return <IconLi key={index} name={ingredient} />;
          })}
        </ul>
        {recipe.instructions
          .split(".")
          .filter((sentence) => sentence.trim().length > 0)
          .map((sentence, index, array) => {
            const trimmedSentence = sentence.trim();
            const capitalizedSentence =
              trimmedSentence.charAt(0).toUpperCase() +
              trimmedSentence.slice(1);
            return <p key={index}>{capitalizedSentence}.</p>;
          })}
      </div>
    </div>
  );
}
