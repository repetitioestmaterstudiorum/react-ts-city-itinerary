import React from "react";

type CitiesProps = {
  city: City;
};

const City: React.FC<CitiesProps> = ({ city }) => {
  const { name, country, img } = city;

  return (
    <div>
      <a href="#">
        <img src={img} alt={name}></img>
        <p>
          <strong>{name}</strong>, {country}
        </p>
      </a>
    </div>
  );
};

export default City;
