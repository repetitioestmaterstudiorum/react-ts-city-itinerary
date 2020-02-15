import React from "react";

type CitiesProps = {
  city: City;
};

const City: React.FC<CitiesProps> = ({ city }) => {
  const { name, country, img } = city;

  const url = `/cities/${name.toLowerCase()}`;

  return (
    <a href={url} style={{ textDecoration: "none" }}>
      <div
        className="m-1 border rounded"
        style={{ backgroundColor: "#a85751e6" }}
      >
        <img src={img} alt={`${name}, ${country}`}></img>
        <p
          style={{
            fontSize: "1.2rem",
            textShadow: "1px 0 0 #f55f55",
            color: "white",
            marginBottom: "0.6rem"
          }}
        >
          <strong>{name}</strong>, {country}
        </p>
      </div>
    </a>
  );
};

export default City;
