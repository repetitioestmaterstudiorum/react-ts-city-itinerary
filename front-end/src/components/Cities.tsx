import React from "react";
//import axios from "axios";
import City from "./City";

const Cities: React.FC = () => {
  let fetchedCities = [
    { city: "city 1" },
    { city: "city 1" },
    { city: "city 1" }
  ];
  const fetchCities = () => {};
  return (
    <React.Fragment>
      <section className="conatiner pt-5">
        <div className="text-center">
          <h2>Cities</h2>

          {fetchedCities.map((city, index) => (
            <City key={index} oneCity={city} />
          ))}
        </div>
      </section>
    </React.Fragment>
  );
};

export default Cities;

// import React from "react";
// //import axios from "axios";
// import City from "./City";

// let fetchedCities = ["city 1", "city2", "city 3"];
// const fetchCities = () => {};

// const Cities: React.FC = () => {
//   return (
//     <section className="conatiner pt-5">
//       <div className="text-center">
//         <h2>Cities</h2>
//         <City cities={fetchedCities} />
//       </div>
//     </section>
//   );
// };

// export default Cities;
