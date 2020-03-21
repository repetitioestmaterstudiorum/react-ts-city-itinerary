import React, { useState, ChangeEvent, FormEvent, useContext } from "react";
import { CityContext } from "../context/CityContext";
import { CurrentUserContext } from "../context/CurrentUserContext";
import axios from "axios";
import { Accordion, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const AddCity: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [setCities] = useContext(CityContext);
  const [currentUser] = useContext(CurrentUserContext);

  const updateName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const updateCountry = (e: ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  const containsANumber = (string: string) => {
    return /\d/.test(string);
  };

  // const uploadImage = (e: FormEvent<HTMLFormElement>) => {
  //   fetch("http://localhost:5000/", {
  //     method: "POST",
  //     body: formData
  //   }).then(r => {
  //     console.log(r);
  //   });
  //   console.log(file[0]);
  // };

  const addCityCountryPair = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (containsANumber(name) || containsANumber(country)) {
      alert("City and country must be strings (only letters)!");
    } else if (!name || !country) {
      alert("Enter a city and a country!");
    } else {
      const backendUrl =
        process.env.NODE_ENV === "development"
          ? "http://localhost:5000/"
          : "https://blooming-beyond-66134.herokuapp.com/";
      try {
        const postCity = async () => {
          const res = await axios.post(`${backendUrl}cities/`, {
            name,
            country,
            img:
              "https://via.placeholder.com/300x150.png?text=Image+coming+soon"
          });
          setCities((prevCities: Cities) => [...prevCities, res.data]);
        };
        postCity();
      } catch (err) {
        console.log(err);
      }
      setCountry("");
      setName("");
    }
  };

  return (
    <React.Fragment>
      <h2 className="pt-2">Your city is missing?</h2>
      <Accordion
        className="pb-1"
        style={{
          maxWidth: "400px",
          margin: "10px auto 0"
        }}
      >
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            <span className="fancySpan">Add a city!</span>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {currentUser && currentUser.email ? (
                <form onSubmit={addCityCountryPair}>
                  <div className="d-flex justify-content-center">
                    <label className="col-form-label mr-1" htmlFor="name">
                      City:
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
                    <label className="col-form-label mr-1" htmlFor="country">
                      Country:
                    </label>
                    <div className="flex-shrink-0">
                      <input
                        className="form-control"
                        id="country"
                        type="text"
                        value={country}
                        onChange={updateCountry}
                      />
                    </div>
                  </div>
                  <input
                    type="file"
                    className="form-control-file"
                    id="fileUploadInput"
                  />
                  <div className="d-flex justify-content-center mt-2">
                    <button className="btn btn-primary">Add</button>
                  </div>
                </form>
              ) : (
                <React.Fragment>
                  <Link to="/log-in">
                    <Button variant="link" style={{ marginRight: ".25rem" }}>
                      You need to log in!
                    </Button>
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

export default AddCity;
