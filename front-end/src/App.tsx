import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/Routes";
import { CityProvider } from "./context/CityContext";

const App: React.FC = () => {
  return (
    <CityProvider>
      <Router>
        <Routes />
      </Router>
    </CityProvider>
  );
};

export default App;
