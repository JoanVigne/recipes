export default function Recipe({ recipe, openRecipe }) {
  return (
    <div
      className="containerRecipe"
      onClick={() => openRecipe && openRecipe(recipe)}
    >
      <img
        className="imageRecipe"
        alt={"photo de " + recipe.title + " introuvable"}
        src={recipe.imageUrl ? recipe.imageUrl : ""}
      />
      <div className="containerText">
        <h3 className="titleAndPostedBy">
          {recipe.title}
          <span>{recipe.postedBy && `Posté par ${recipe.postedBy}`}</span>
        </h3>
        <ul>
          <h3>Ingrédients</h3>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
