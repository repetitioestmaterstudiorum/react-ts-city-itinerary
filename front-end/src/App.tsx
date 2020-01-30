import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/layout/Header";
import Routes from "./components/Routes";

// const isLanding = window.location.pathname !== "/";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes />
    </Router>
  );
};

export default App;
