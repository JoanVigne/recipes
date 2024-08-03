import "./containerCreators.css";
import { useEffect, useState } from "react";
import majOnFirstLetter from "../utils/majOnFirstLetter";

export default function ContainerCreators() {
  const [creators, setCreators] = useState([]);
  useEffect(() => {
    const sessionStorage = window.sessionStorage.getItem("recipes");
    const recipes = JSON.parse(sessionStorage) || [];
    const creatorCountMap = new Map();
    recipes.forEach((recipe) => {
      const creator = recipe.postedBy;
      if (creatorCountMap.has(creator)) {
        creatorCountMap.set(creator, creatorCountMap.get(creator) + 1);
      } else {
        creatorCountMap.set(creator, 1);
      }
    });
    const creatorCounts = Array.from(creatorCountMap, ([name, count]) => ({
      name,
      count,
    }));
    setCreators(creatorCounts);
  }, []);

  return (
    <>
      <section className="container-creators">
        <h2>Les créateurs</h2>
        {creators && creators.length > 0 && (
          <ul>
            {creators
              .sort((a, b) => b.count - a.count)
              .map((creator, index) => {
                let imgInFile;
                try {
                  imgInFile = require(`../assets/photos/${creator.name.toLowerCase()}.png`);
                } catch (e) {
                  try {
                    imgInFile = require(`../assets/photos/${creator.name.toLowerCase()}.jpg`);
                  } catch (e) {
                    imgInFile = null;
                  }
                }
                return (
                  <li key={index}>
                    {imgInFile ? (
                      <img src={imgInFile} alt={"photo de " + creator.name} />
                    ) : (
                      ""
                    )}
                    <h3>
                      {majOnFirstLetter(creator.name)} avec {creator.count}{" "}
                      {creator.count > 1 ? "recettes" : "recette"}.
                    </h3>
                  </li>
                );
              })}
          </ul>
        )}
      </section>
    </>
  );
}
