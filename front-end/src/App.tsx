import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/Landing";
import LogIn from "./components/LogIn";
import CreateAccount from "./components/CreateAccount";
import Browse from "./components/Browse";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

const App: React.FC = () => {
    return (
        <Router>
            <Header />
            <Route path="/" exact component={Landing} />
            <Route path="/create-account" component={CreateAccount} />
            <Route path="/log-in" component={LogIn} />
            <Route path="/browse" component={Browse} />
            {window.location.pathname && <Footer />}
        </Router>
    );
};

export default App;
