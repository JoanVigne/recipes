import IconLi from "./IconLi";
import "./recipe.css";
import React, { useEffect } from "react";
import majOnFirstLetter from "../../utils/majOnFirstLetter";
import { Link } from "react-router-dom";
import down from "../../assets/icons/down.png";
import up from "../../assets/icons/up.png";
export default function Recipe({ recipe }) {
  const [moreDetails, setMoreDetails] = React.useState(false);

  useEffect(() => {
    console.log("Recipe component mounted");
  }, []);
  return (
    <div className="containerRecipe">
      {recipe.imageUrl ? (
        <Link
          to={`/recipe/${recipe.id}`}
          key={
            recipe.id
              ? recipe.id
              : recipe.createAt
              ? recipe.createAt
              : Math.random()
          }
        >
          <img
            className="imageRecipe"
            alt={"photo de " + recipe.title}
            /*   onClick={() => window.open(recipe.imageUrl)} */
            src={recipe.imageUrl ? recipe.imageUrl : ""}
          />
        </Link>
      ) : (
        <div className="imageRecipe"></div>
      )}

      <div className="containerText">
        <Link
          to={`/recipe/${recipe.id}`}
          key={
            recipe.id
              ? recipe.id
              : recipe.createAt
              ? recipe.createAt
              : Math.random()
          }
        >
          <div className="titleAndPostedBy">
            <h3>{majOnFirstLetter(recipe.title)}</h3>
            <i>
              {recipe.postedBy &&
                `Posté par ${majOnFirstLetter(recipe.postedBy)}`}
            </i>
          </div>
        </Link>

        <div
          className={
            moreDetails
              ? "container-ingredients-instructions more-details"
              : "container-ingredients-instructions"
          }
        >
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
        {!moreDetails ? (
          <div
            className="display-more-details"
            onClick={() => setMoreDetails(!moreDetails)}
          >
            <img className="down" src={down} alt="Show more" />
          </div>
        ) : (
          <div
            className="display-more-details"
            onClick={() => setMoreDetails(!moreDetails)}
          >
            <img className="up" src={up} alt="Show less" />
          </div>
        )}
      </div>
    </div>
  );
}
