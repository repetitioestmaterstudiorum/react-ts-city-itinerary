import React, { FC } from "react";
import Browse from "../components/Browse";

const Landing: FC = () => {
  return (
    <div className="landingImage">
      <section className="container-fluid pt-3">
        <div className="text-center landingContent">
          <h1>City Itinerary</h1>
          <span className="fancySpan" style={{ fontSize: "1.3rem" }}>
            Find your perfect trip, designed by insiders who know and love their
            cities!
          </span>
          <Browse />
        </div>
      </section>
    </div>
  );
};

export default Landing;
