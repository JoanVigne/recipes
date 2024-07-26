import React, { useState, useEffect } from "react";
import "./App.css";
import ContainerRecipes from "./components/ContainerRecipes";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import RecipePage from "./components/RecipePage";
import ContainerCreators from "./components/ContainerCreators";

function App() {
  const [showCreators, setShowCreators] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCreators(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
          {showCreators && <ContainerCreators />}
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
