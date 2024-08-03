import IconLi from "./IconLi";
import "./recipe.css";
import React from "react";

export default function Recipe({ recipe }) {
  function majOnFirstLetter(sentence) {
    // if all the letters are in CApital letters
    if (sentence !== sentence.toUpperCase()) {
      return sentence;
    }
    // seperate each word and apply a MAJ on the first letter of each word
    sentence = sentence.toLowerCase().split(" ");
    for (let i = 0; i < sentence.length; i++) {
      sentence[i] = sentence[i].charAt(0).toUpperCase() + sentence[i].slice(1);
    }
    sentence = sentence.join(" ");
    return sentence;
  }

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
          <h3>{majOnFirstLetter(recipe.title)}</h3>
          <i>
            {recipe.postedBy &&
              `Posté par ${majOnFirstLetter(recipe.postedBy)}`}
          </i>
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
