import React from "react";

type CitiesProps = {
  city: City;
};

const City: React.FC<CitiesProps> = ({ city }) => {
  const { name, country, img } = city;

  return (
    <React.Fragment>
      <p>
        <strong>{name}</strong>, {country}
      </p>
      <img src={img}></img>
    </React.Fragment>
  );
};

export default City;
