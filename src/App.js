import "./App.css";
import ContainerRecipes from "./components/ContainerRecipes";

import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <ContainerRecipes />
      </main>
    </div>
  );
}

export default App;
