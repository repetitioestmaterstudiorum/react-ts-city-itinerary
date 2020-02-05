import React, { useEffect, useState } from "react";
import axios from "axios";
import City from "./City";

const port = process.env.PORT || 5000;

const Cities: React.FC = () => {
  const [cities, setCities] = useState<Cities>([]); // the empty [] declares an empty array at first

  const fetchCities = async () => {
    let res = await axios.get(`http://localhost:${port}/cities/all`);
    let data = res.data;
    setCities(data);
    console.log("fetching cities");
  };

  useEffect(() => {
    console.log("useEffect");
    fetchCities();
  }, []); // empty [] means running it only once

  return (
    <React.Fragment>
      {console.log("***** return ***** cities: ", cities)}
      <section className="conatiner pt-5">
        <div className="text-center">
          <h2>Cities</h2>
          {console.log("cities !== undefined", cities !== undefined)}
          {cities && cities.map((city, _id) => <City key={_id} city={city} />)}
        </div>
      </section>
    </React.Fragment>
  );
};

export default Cities;
