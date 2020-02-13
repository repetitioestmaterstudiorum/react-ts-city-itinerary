import React from "react";

type CitiesProps = {
  city: City;
};

const City: React.FC<CitiesProps> = ({ city }) => {
  const { name, country, img } = city;

  const url = `/cities/${name.toLowerCase()}`;

  return (
    <div>
      <a href={url}>
        <img src={img} alt={`${name}, ${country}`}></img>
        <p>
          <strong>{name}</strong>, {country}
        </p>
      </a>
    </div>
  );
};

export default City;
