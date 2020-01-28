import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/layout/Header";
import Routes from "./components/Routes";

const isLanding = window.location.pathname !== "/";

const App: React.FC = () => {
    // useEffect(() => {
    //     var isLanding = window.location.pathname !== "/";
    //     console.log(isLanding);
    // }, []);
    return (
        <Router>
            <Header />
            <Routes isLanding={isLanding} />
        </Router>
    );
};

export default App;

/*
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/Landing";
import LogIn from "./components/LogIn";
import CreateAccount from "./components/CreateAccount";
import Browse from "./components/Browse";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

const App: React.FC = () => {
    useEffect(() => {
        var pathname = window.location.pathname;
        console.log(pathname);
    }, []);
    return (
        <Router>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/create-account" component={CreateAccount} />
            <Route exact path="/log-in" component={LogIn} />
            <Route exact path="/browse" component={Browse} />
            {window.location.pathname !== "/" && <Footer />}
        </Router >
    );
};

export default App;
*/
