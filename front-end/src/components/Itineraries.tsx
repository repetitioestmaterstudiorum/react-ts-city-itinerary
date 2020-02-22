import React from "react";

type ItinerariesProps = {
  itineraries: Itineraries;
};

const Itineraries: React.FC<ItinerariesProps> = props => {
  console.log("props.itineraries", props.itineraries);

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  };

  const handleItineraryExpand = () => {
    console.log("hello");
  };

  return (
    <React.Fragment>
      {props.itineraries.map((itinerary: Itinerary, index: number) => (
        <div
          key={index.toString()}
          className="row"
          style={{
            border: "6px solid #fff",
            borderBottom: "30px solid #fff",
            boxShadow: "2px 2px 7px #777",
            margin: "0 0 13px 0",
            backgroundColor: `#${generateColor()}10`
          }}
        >
          <div
            className="col-5 pt-2"
            style={{ backgroundColor: "rgba(183, 183, 183, 0.15)" }}
          >
            <img
              src={itinerary.profilePicture}
              style={{
                borderRadius: "50%",
                maxWidth: "40px",
                marginRight: "5px"
              }}
              alt="Profilepicture of Itinerary Creator"
            ></img>
            <span style={{ display: "block" }}>{itinerary.profileName}</span>
          </div>
          <div className="col-7" style={{ textAlign: "left" }}>
            <span
              className="fancySpan"
              style={{ display: "block", marginTop: "1px" }}
            >
              {itinerary.name}
            </span>
            <span
              style={{
                color: "#151515",
                display: "block"
              }}
            >
              {itinerary.likes} Likes
            </span>
            <span
              style={{
                color: "#151515",
                fontStyle: "italic",
                display: "block"
              }}
            >
              #{itinerary.hashtags[0]}
              {itinerary.hashtags[1] && " #" + itinerary.hashtags[1]}
              {itinerary.hashtags[2] && " #" + itinerary.hashtags[2]}
            </span>
          </div>
          <p
            className="fancySpan"
            style={{
              textAlign: "center",
              margin: "auto",
              marginBottom: "-25px",
              fontSize: "0.85rem",
              width: "100%"
            }}
            onClick={handleItineraryExpand}
          >
            Click here to Expand
          </p>
        </div>
      ))}
    </React.Fragment>
  );
};

export default Itineraries;
