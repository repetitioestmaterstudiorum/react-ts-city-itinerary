import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/Routes";
import AddToHomescreen from "react-add-to-homescreen";

const App: React.FC = () => {
  const handleAddToHomescreenClick = () => {
    alert(`
    1. Open the Share menu
    2. Tap on "Add to Home Screen" button`);
  };

  return (
    <React.Fragment>
      <Router>
        <Routes />
      </Router>
      <AddToHomescreen onAddToHomescreenClick={handleAddToHomescreenClick} />
    </React.Fragment>
  );
};

export default App;
