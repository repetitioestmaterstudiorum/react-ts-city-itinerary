import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useContext,
  MouseEvent
} from "react";
import { ItineraryContext } from "../context/ItineraryContext";
import axios from "axios";
import { Accordion, Card } from "react-bootstrap";

const AddItinerary: React.FC<CityProps> = props => {
  const [name, setName] = useState("");
  const cityName = props.city.name;
  const profileName = "John Doe";
  const profilePicture = "https://via.placeholder.com/100x100.png?text=:)";
  const likes = 0;
  const [hashtagField, setHashtagField] = useState<string>("");
  const [hashtagArray, setHashtagArray] = useState<string[]>([]);
  // eslint-disable-next-line
  const [itineraries, setItineraries] = useContext(ItineraryContext);

  const updateName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const updateHashtagField = (e: ChangeEvent<HTMLInputElement>) => {
    setHashtagField(e.target.value);
  };

  const containsANumber = (string: string) => {
    return /\d/.test(string);
  };
  const containsASpace = (string: string) => {
    return /\s/.test(string);
  };

  const addHashtag = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!hashtagField) {
      alert("Enter at least the first hashtag!");
    } else if (containsASpace(hashtagField)) {
      alert("Hashtag can not contain spaces!");
    } else if (containsANumber(hashtagField)) {
      alert("Hashtags can not contain a number!");
    } else {
      setHashtagArray([...hashtagArray, hashtagField]);
      setHashtagField("");
    }
  };

  const addItinerary = (e: FormEvent<HTMLFormElement>) => {
    if (containsANumber(name)) {
      alert("The name can not contain a number!");
    } else if (!name) {
      alert("Enter a name!");
    } else {
      e.preventDefault();
      const port = process.env.PORT || 5000;
      axios
        .post(`http://localhost:${port}/itineraries/`, {
          name,
          city: cityName,
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
    }
  };

  return (
    <Accordion style={accordionStyle}>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          <span className="fancySpan">Click here to add an itinerary!</span>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body style={{ padding: "5px" }}>
            <div className="container">
              <div className="row">
                <label
                  className="col col-form-label mr-1"
                  htmlFor="hashtagField">
                  Enter a hashtag and press "Add hashtag":
                  <span className="d-block">
                    (You must enter at least one hashtag)
                  </span>
                </label>
              </div>
              <div className="row mb-2">
                <div className="col col-7 pl-2 pr-0">
                  <input
                    className="form-control"
                    id="hashtagField"
                    type="text"
                    value={hashtagField}
                    onChange={updateHashtagField}
                  />
                </div>
                <div className="col col-5 p-0">
                  <button
                    onClick={addHashtag}
                    className="btn btn-link"
                    style={{ border: "1px solid #f55f55" }}>
                    Add hashtag
                  </button>
                </div>
              </div>
              {hashtagArray.length > 0 && (
                <div className="row mb-2">
                  <div className="col col-5 p-0">
                    <span>Added Hashtags:</span>
                  </div>
                  <div className="col col-7 p-0">
                    {hashtagArray.map((hashtag, index) => (
                      <span key={index} style={{ fontStyle: "italic" }}>
                        #{hashtag}{" "}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {/* {hashtagArray && <span>Added Hashtags:</span>}
              {hashtagArray &&
                hashtagArray.map((hashtag, index) => (
                  <span key={index} style={{ fontStyle: "italic" }}>
                    #{hashtag}{" "}
                  </span>
                ))} */}
            </div>
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
              <div className="d-flex justify-content-center mt-3">
                <div>
                  <button
                    className="btn btn-link"
                    style={{ border: "1px solid #f55f55" }}>
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
