import React from "react";
import { Route } from "react-router-dom";
import Landing from "../pages/Landing";
import SiteNotice from "../pages/SiteNotice";
import Header from "./layout/Header";
import LogIn from "../pages/LogIn";
import CreateAccount from "../pages/CreateAccount";
import Cities from "../pages/cities/Cities";
import CityDetail from "../pages/cities/CityDetail";
import Profile from "../pages/Profile";
import Footer from "./layout/Footer";
import { CityProvider } from "../context/CityContext";
import { CurrentUserProvider } from "../context/CurrentUserContext";

const Routes: React.FC = () => {
  return (
    <CurrentUserProvider>
      <Header />
      <Route exact path="/" component={Landing} />
      <Route exact path="/site-notice" component={SiteNotice} />
      <Route exact path="/create-account" component={CreateAccount} />
      <Route exact path="/log-in" component={LogIn} />
      <Route exact path="/profile" component={Profile} />
      <CityProvider>
        <Route exact path="/cities" component={Cities} />
        <Route path="/cities/:name" component={CityDetail} />
      </CityProvider>
      <Footer />
    </CurrentUserProvider>
  );
};

export default Routes; // without "withRouter", the component rendering Routes.tsx would need to pass props to Routes.tsx. withRoutes
