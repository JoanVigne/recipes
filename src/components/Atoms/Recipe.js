import IconLi from "./IconLi";
import "./recipe.css";
import React, { useEffect, useRef } from "react";
import majOnFirstLetter from "../../utils/majOnFirstLetter";
import { Link, useLocation } from "react-router-dom";
import down from "../../assets/icons/down.png";
import up from "../../assets/icons/up.png";
import scrollIntoThisRef from "../../utils/scrollIntoThisRef";
export default function Recipe({ recipe, detailsOpen }) {
  const [moreDetails, setMoreDetails] = React.useState(detailsOpen);
  const refContainerPosition = useRef(null);
  const location = useLocation();
  useEffect(() => {
    if (detailsOpen) {
      setMoreDetails(detailsOpen);
    }
  }, [detailsOpen]);
  function clickOnMoreDetails() {
    setMoreDetails(!moreDetails);
    const currentUrl = location.pathname + location.search;
    console.log("Current URL:", currentUrl);
    if (currentUrl === "/") {
      scrollIntoThisRef(refContainerPosition, -10);
    } else {
      scrollIntoThisRef(refContainerPosition, -250);
    }
  }

  return (
    <div className="containerRecipe" ref={refContainerPosition}>
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
          {
            <div className="display-more-details" onClick={clickOnMoreDetails}>
              <img
                className={moreDetails ? "up" : "down"}
                src={moreDetails ? up : down}
                alt="Show more"
              />
            </div>
          }
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
    </div>
  );
}
