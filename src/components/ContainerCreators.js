import "./containerCreators.css";
import { useEffect, useState } from "react";

export default function ContainerCreators() {
  const [creators, setCreators] = useState([]);
  useEffect(() => {
    const sessionStorage = window.sessionStorage.getItem("recipes");
    console.log(sessionStorage);
    const recipes = JSON.parse(sessionStorage) || [];
    console.log(recipes);

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
            {creators.map((creator, index) => {
              console.log(creator);
              return (
                <li key={index}>
                  <h3>
                    {creator.name} avec {creator.count}{" "}
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
