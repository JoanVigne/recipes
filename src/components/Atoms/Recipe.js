import "./recipe.css";

export default function Recipe({ recipe, openRecipe }) {
  const myIcons = [
    "beurre",
    "ble",
    "oeuf",
    "sucre",
    "cacao",
    "cafe",
    "miel",
    "vanille",
  ];
  function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  return (
    <div
      // here the key ?
      className="containerRecipe"
      onClick={() => openRecipe && openRecipe(recipe)}
    >
      <img
        className="imageRecipe"
        alt={"photo de " + recipe.title + " indisponible"}
        onClick={() => window.open(recipe.imageUrl)}
        src={recipe.imageUrl ? recipe.imageUrl : ""}
      />
      <div className="containerText">
        <h3 className="titleAndPostedBy">
          {recipe.title}
          <i>{recipe.postedBy && `Posté par ${recipe.postedBy}`}</i>
        </h3>
        <h3>Ingrédients</h3>
        <ul>
          {recipe.ingredients.map((ingredient, index) => {
            // Attempt to find a matching icon
            let matchingIcon;
            let ingredientNoAccent = removeAccents(ingredient.toLowerCase());
            if (ingredientNoAccent.includes("chocolat")) {
              matchingIcon = "cacao";
            } else if (ingredientNoAccent.includes("farine")) {
              matchingIcon = "ble";
            } else {
              matchingIcon = myIcons.find((ic) =>
                ingredientNoAccent.includes(removeAccents(ic))
              );
              if (!matchingIcon) {
                matchingIcon = myIcons.find((ic) => ingredient.includes(ic));
              }
            }
            if (matchingIcon) {
              return (
                <li key={index} className="li-with-icon">
                  <img
                    className="icon-ingredient"
                    src={require(`/src/assets/icons/${matchingIcon}.png`)}
                    alt="icon"
                  />
                  {ingredient}
                </li>
              );
            } else {
              return <li key={index}>{ingredient}</li>;
            }
          })}
        </ul>
        <p>{recipe.instructions}</p>
      </div>
    </div>
  );
}
