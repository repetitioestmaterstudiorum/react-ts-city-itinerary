import React, { FC } from "react";

type CitiesProps = {
  city: City;
};

const City: FC<CitiesProps> = ({ city }) => {
  const { name, country, img } = city;

  const url = `/cities/${name.toLowerCase()}`;

  return (
    <a href={url} style={{ textDecoration: "none" }}>
      <div
        className="m-1 border rounded"
        style={{ backgroundColor: "#5c5c5c" }}>
        <img
          src={img}
          alt={`${name}, ${country}`}
          style={{ padding: "2px" }}></img>
        <p
          style={{
            fontSize: "1.2rem",
            textShadow: "1px 0 0 #f55f55",
            color: "white",
            marginBottom: "0.2rem",
            marginTop: "0px"
          }}>
          <strong>{name}</strong>, {country}
        </p>
      </div>
    </a>
  );
};

export default City;
