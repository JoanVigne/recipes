import "./recipe.css";

export default function Recipe({ recipe, openRecipe }) {
  return (
    <div
      // here the key ?
      className="containerRecipe"
      onClick={() => openRecipe && openRecipe(recipe)}
    >
      <img
        className="imageRecipe"
        alt={"photo de " + recipe.title + " introuvable"}
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
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <p>{recipe.instructions}</p>
      </div>
    </div>
  );
}
