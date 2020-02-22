import React, { useState, ChangeEvent, FormEvent, useContext } from "react";
import { ItineraryContext } from "../context/ItineraryContext";
import axios from "axios";
import { Accordion, Card } from "react-bootstrap";

type CityProps = {
  city: City;
};

const AddItinerary: React.FC<CityProps> = props => {
  const [name, setName] = useState("");
  const city = props.city.name;
  const profileName = "John Doe";
  const profilePicture = "https://via.placeholder.com/100x100.png?text=:)";
  const likes = 0;
  const [hashtagOne, setHashtagOne] = useState("");
  const [hashtagTwo, setHashtagTwo] = useState("");
  const [hashtagThree, setHashtagThree] = useState("");

  // eslint-disable-next-line
  const [itineraries, setItineraries] = useContext(ItineraryContext);

  const updateName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const updateHashtagOne = (e: ChangeEvent<HTMLInputElement>) => {
    setHashtagOne(e.target.value);
  };
  const updateHashtagTwo = (e: ChangeEvent<HTMLInputElement>) => {
    setHashtagTwo(e.target.value);
  };
  const updateHashtagThree = (e: ChangeEvent<HTMLInputElement>) => {
    setHashtagThree(e.target.value);
  };

  const containsANumber = (string: string) => {
    return /\d/.test(string);
  };
  const containsASpace = (string: string) => {
    return /\s/.test(string);
  };

  const addItinerary = (e: FormEvent<HTMLFormElement>) => {
    if (!hashtagOne) {
      alert("Enter at least the first hashtag!");
    }
    if (
      containsASpace(hashtagOne) ||
      containsASpace(hashtagTwo) ||
      containsASpace(hashtagThree)
    ) {
      alert("Hashtags can not contain spaces!");
    }
    if (
      containsANumber(hashtagOne) ||
      containsANumber(hashtagTwo) ||
      containsANumber(hashtagThree)
    ) {
      alert("Hashtags can not contain a number!");
    }
    const hashtagArray: string[] = [];
    const addToArrayIfNotEmpty = (value: string) => {
      if (value.length > 0) {
        hashtagArray.push(value);
      }
    };
    addToArrayIfNotEmpty(hashtagOne);
    addToArrayIfNotEmpty(hashtagTwo);
    addToArrayIfNotEmpty(hashtagThree);
    if (containsANumber(name)) {
      alert("The name can not contain a number!");
    } else if (name) {
      e.preventDefault();
      const port = process.env.PORT || 5000;
      axios
        .post(`http://localhost:${port}/itineraries/`, {
          name,
          city,
          profileName,
          profilePicture,
          likes,
          hashtags: hashtagArray
        })
        .then(response =>
          setItineraries((prevItineraries: Itineraries) => [
            ...prevItineraries,
            response.data
          ])
        );
      setName("");
      setHashtagOne("");
      setHashtagTwo("");
      setHashtagThree("");
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
              <div className="d-flex justify-content-between">
                <div>
                  <label className="col-form-label mr-1" htmlFor="name">
                    Name*:
                  </label>
                </div>
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
              <div className="d-flex justify-content-between mt-1">
                <div>
                  <label className="col-form-label mr-1" htmlFor="hashtagOne">
                    1. Hashtag*:
                  </label>
                </div>
                <div className="flex-shrink-0">
                  <input
                    className="form-control"
                    id="hashtagOne"
                    type="text"
                    value={hashtagOne}
                    onChange={updateHashtagOne}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between mt-1">
                <div>
                  <label className="col-form-label mr-1" htmlFor="hashtagTwo">
                    2. Hashtag:
                  </label>
                </div>
                <div className="flex-shrink-0">
                  <input
                    className="form-control"
                    id="hashtagTwo"
                    type="text"
                    value={hashtagTwo}
                    onChange={updateHashtagTwo}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between mt-1">
                <div>
                  <label className="col-form-label mr-1" htmlFor="hashtagThree">
                    3. Hashtag:
                  </label>
                </div>
                <div className="flex-shrink-0">
                  <input
                    className="form-control"
                    id="hashtagThree"
                    type="text"
                    value={hashtagThree}
                    onChange={updateHashtagThree}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center mt-3">
                <div>
                  <button
                    className="btn btn-link"
                    style={{ border: "1px solid #f55f55" }}
                  >
                    Add itinerary!
                  </button>
                </div>
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
