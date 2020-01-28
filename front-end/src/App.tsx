import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Header from "./components/layout/Header";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Route path="/" component={Landing} />
    </Router>
  );
};

export default App;
