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
        style={{ backgroundColor: "#424242" }}
      >
        <div
          style={{
            width: "300px",
            height: "150px",
            overflow: "hidden",
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        ></div>
        <p
          style={{
            fontSize: "1.2rem",
            color: "white",
            marginBottom: "0.2rem",
            marginTop: "0px"
          }}
        >
          <span>
            <span style={{ textDecoration: "underline" }}>{name}</span>,{" "}
            {country}
          </span>
        </p>
      </div>
    </a>
  );
};

export default City;
