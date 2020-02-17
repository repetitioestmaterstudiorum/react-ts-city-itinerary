import React, { useState, ChangeEvent, FormEvent, useContext } from "react";
import { ItineraryContext } from "../context/ItineraryContext";
import axios from "axios";
import { Accordion, Card } from "react-bootstrap";

const AddItinerary: React.FC<any> = props => {
  const [name, setName] = useState("");
  const [itineraries, setItineraries] = useContext(ItineraryContext);

  const updateName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const city = props.city;
  console.log("city", city);

  const containsANumber = (string: string) => {
    return /\d/.test(string);
  };

  const addItinerary = (e: FormEvent<HTMLFormElement>) => {
    if (containsANumber(name)) {
      alert("The name must be a string (only letters)!");
    } else if (name) {
      console.log("name", name);
      e.preventDefault();
      const port = process.env.PORT || 5000;
      axios
        .post(`http://localhost:${port}/itineraries/`, {
          name: name,
          city: city,
          img: "https://via.placeholder.com/100x100.png?text=:)"
        })
        .then(response =>
          setItineraries((prevItineraries: Itineraries) => [
            ...prevItineraries,
            response.data
          ])
        );
      setName("");
    } else {
      alert("Enter a name!");
    }
  };

  return (
    <Accordion style={accordionStyle}>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          <span className="fancySpan">Click here to add an itinerary!</span>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <form onSubmit={addItinerary}>
              <div className="d-flex justify-content-center">
                <label className="col-form-label mr-1" htmlFor="name">
                  Name:
                </label>
                <div className="flex-shrink-0">
                  <input
                    className="form-control"
                    id="name"
                    type="text"
                    value={name}
                    onChange={updateName}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center mt-2">
                <button
                  className="btn btn-link"
                  style={{ border: "1px solid #f55f55" }}
                >
                  Add
                </button>
              </div>
            </form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

const accordionStyle = {
  maxWidth: "400px",
  margin: "10px auto 0"
};

export default AddItinerary;
