import "./App.css";
import ContainerRecipes from "./components/ContainerRecipes";
import FormNewRecipe from "./components/FormNewRecipe";

function App() {
  return (
    <div className="App">
      <FormNewRecipe />
      <main>
        <ContainerRecipes />
      </main>
    </div>
  );
}

export default App;
