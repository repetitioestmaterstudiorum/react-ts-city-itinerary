import React from "react";
import { Route } from "react-router-dom";
import Landing from "./Landing";
import SiteNotice from "./SiteNotice";
import Header from "./layout/Header";
import LogIn from "./LogIn";
import CreateAccount from "./CreateAccount";
import Cities from "./Cities";
import CityDetail from "./CityDetail";
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
      <CityProvider>
        <Route exact path="/cities" component={Cities} />
        <Route path="/cities/:name" component={CityDetail} />
      </CityProvider>
      <Footer />
    </CurrentUserProvider>
  );
};

export default Routes; // without "withRouter", the component rendering Routes.tsx would need to pass props to Routes.tsx. withRoutes
