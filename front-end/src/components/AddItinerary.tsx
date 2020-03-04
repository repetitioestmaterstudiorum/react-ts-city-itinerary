import React, {
  useState,
  ChangeEvent,
  useContext,
  MouseEvent,
  useEffect
} from "react";
import { ItineraryContext } from "../context/ItineraryContext";
import axios from "axios";
import { Accordion, Card } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const AddItinerary: React.FC<CityProps> = props => {
  const [setItineraries] = useContext(ItineraryContext);
  const [name, setName] = useState<string>("");
  const [hashtagField, setHashtagField] = useState<string>("");
  const [hashtagArray, setHashtagArray] = useState<string[]>([]);
  const [activityField, setActivityField] = useState<string>("");
  const [activitiesArray, setActivitiesArray] = useState<string[]>([]);
  const [activitiesString, setActivitiesString] = useState<string>("");
  const [user] = useContext(UserContext);
  const likes = 0;
  // to do later:
  const cityName = props.city.name;
  const profileName = "John Doe";
  const profilePicture = "https://via.placeholder.com/100x100.png?text=:)";

  const containsANumber = (string: string) => {
    return /\d/.test(string);
  };
  const containsASpace = (string: string) => {
    return /\s/.test(string);
  };

  const updateName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const updateHashtagField = (e: ChangeEvent<HTMLInputElement>) => {
    setHashtagField(e.target.value);
  };
  const updateActivityField = (e: ChangeEvent<HTMLInputElement>) => {
    setActivityField(e.target.value);
  };

  const addHashtag = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!hashtagField) {
      alert("Enter at least one hashtag!");
    } else if (containsASpace(hashtagField)) {
      alert("Hashtags can not contain spaces!");
    } else if (containsANumber(hashtagField)) {
      alert("Hashtags can not contain a number!");
    } else {
      setHashtagArray([...hashtagArray, hashtagField]);
      setHashtagField("");
    }
  };

  const addActivity = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!activityField) {
      alert("Enter at least one Activity!");
    } else {
      setActivitiesArray([...activitiesArray, activityField]);
      setActivityField("");
    }
  };

  useEffect(() => {
    setActivitiesString(activitiesArray.join(", "));
  }, [activitiesArray]);

  const addItinerary = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (containsANumber(name)) {
      alert("The name can not contain a number!");
    } else if (!name) {
      alert("Enter a name!");
    } else if (hashtagArray.length < 1) {
      alert("Enter at least one hashtag!");
    } else if (activitiesArray.length < 1) {
      alert("Enter at least one activity!");
    } else {
      const backendUrl =
        process.env.NODE_ENV === "development"
          ? "http://localhost:5000"
          : "https://blooming-beyond-66134.herokuapp.com/";
      try {
        const postItinerary = async () => {
          const res = await axios.post(`${backendUrl}/itineraries/`, {
            name,
            city: cityName,
            profileName,
            profilePicture,
            likes,
            hashtags: hashtagArray,
            activities: activitiesArray
          });
          setItineraries((prevItineraries: Itineraries) => [
            ...prevItineraries,
            res.data
          ]);
        };
        postItinerary();
      } catch (err) {
        console.log(err);
      }
      setName("");
      setHashtagArray([]);
      setActivitiesArray([]);
      setActivitiesString("");
    }
  };

  return (
    <React.Fragment>
      <h3 className="pt-3">Add an itinerary</h3>
      <Accordion
        className="pb-2"
        style={{
          maxWidth: "330px",
          margin: "10px auto 0"
        }}>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            <span className="fancySpan">Click here to add an itinerary!</span>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body style={{ padding: "5px" }}>
              {user && user.email ? (
                <div className="container mt-2 mb-2">
                  <div className="row">
                    <div className="col col-6 pl-2">
                      <label className="col-form-label mr-1" htmlFor="name">
                        Itinerary Name*:
                      </label>
                    </div>
                    <div className="col col-6 pr-2">
                      <input
                        className="form-control"
                        id="name"
                        type="text"
                        value={name}
                        onChange={updateName}
                      />
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <label
                      className="col pl-2 pr-2 pt-0 col-form-label"
                      htmlFor="hashtagField">
                      Enter hashtags*:
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
                      <div className="col col-5 pl-2 pr-0">
                        <span>Added Hashtags:</span>
                      </div>
                      <div className="col col-7 pr-2 pl-0">
                        {hashtagArray.map((hashtag, index) => (
                          <span key={index} style={{ fontStyle: "italic" }}>
                            #{hashtag}{" "}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <hr></hr>
                  <div className="row">
                    <label
                      className="col pl-2 pr-2 pt-0 col-form-label"
                      htmlFor="activityField">
                      Enter activities*:
                    </label>
                  </div>
                  <div className="row mb-2">
                    <div className="col col-7 pl-2 pr-0">
                      <input
                        className="form-control"
                        id="activityField"
                        type="text"
                        value={activityField}
                        onChange={updateActivityField}
                      />
                    </div>
                    <div className="col col-5 p-0">
                      <button
                        onClick={addActivity}
                        className="btn btn-link"
                        style={{ border: "1px solid #f55f55" }}>
                        Add activity
                      </button>
                    </div>
                  </div>
                  {activitiesString && (
                    <div className="row mb-2">
                      <div className="col col-5 pl-2 pr-0">
                        <span>Added Activities:</span>
                      </div>
                      <div className="col col-7 pr-2 pl-0">
                        {activitiesString}
                      </div>
                    </div>
                  )}
                  <hr></hr>
                  <div className="row">
                    <div className="col pl-2 pr-2">
                      <button
                        onClick={addItinerary}
                        className="btn btn-link"
                        style={{ border: "1px solid #f55f55" }}>
                        Add itinerary!
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <React.Fragment>
                  <Link to="/log-in">
                    <Button variant="primary" style={{ marginRight: ".25rem" }}>
                      Log in
                    </Button>
                  </Link>
                  <Link to="/create-account">
                    <Button variant="primary">Create Account</Button>
                  </Link>
                </React.Fragment>
              )}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </React.Fragment>
  );
};

export default AddItinerary;
