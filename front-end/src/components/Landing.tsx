import React, { FC } from "react";
import Browse from "./Browse";

const Landing: FC = () => {
  return (
    <section className="container pt-3">
      <div className="text-center">
        <h1>City Itinerary</h1>
        <span className="fancySpan" style={{ fontSize: "1.3rem" }}>
          Find your perfect trip, designed by insiders who know and love their
          cities!
        </span>
        <Browse />
      </div>
    </section>
  );
};

export default Landing;
