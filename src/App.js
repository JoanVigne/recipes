import "./App.css";
import ContainerRecipes from "./components/ContainerRecipes";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import RecipePage from "./components/RecipePage";
import ContainerCreators from "./components/ContainerCreators";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            {/* Route for the home page showing all recipes */}
            <Route path="/" element={<ContainerRecipes />} />
            {/* Route for individual recipe pages */}
            <Route path="/recipe/:id" element={<RecipePage />} />
          </Routes>
          <ContainerCreators />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
