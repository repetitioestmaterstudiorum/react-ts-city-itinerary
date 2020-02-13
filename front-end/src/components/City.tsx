import React from "react";

type CitiesProps = {
  city: City;
};

const City: React.FC<CitiesProps> = ({ city }) => {
  const { name, country, img } = city;

  const url = `/cities/${name.toLowerCase()}`;

  return (
    <a href={url}>
      <div className="m-1 border rounded">
        <img src={img} alt={`${name}, ${country}`}></img>
        <p>
          <strong>{name}</strong>, {country}
        </p>
      </div>
    </a>
  );
};

export default City;
