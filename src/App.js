import "./App.css";
import ContainerRecipes from "./components/ContainerRecipes";
import Footer from "./components/Footer";

import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <ContainerRecipes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
