import React, { useState, ChangeEvent, FormEvent, useContext } from "react";
import { CityContext } from "../context/CityContext";
import axios from "axios";
import { Accordion, Card } from "react-bootstrap";

const AddCity: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  // eslint-disable-next-line
  const [cities, setCities] = useContext(CityContext);

  const updateCity = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const updateCountry = (e: ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  const containsANumber = (string: string) => {
    return /\d/.test(string);
  };

  const addCityCountryPair = (e: FormEvent<HTMLFormElement>) => {
    if (containsANumber(city) || containsANumber(country)) {
      alert("City and country must be strings (only letters)!");
      e.preventDefault();
    } else if (city && country) {
      e.preventDefault();
      const port = process.env.PORT || 5000;
      axios
        .post(`http://localhost:${port}/cities/`, {
          name: city,
          country: country,
          img: "https://via.placeholder.com/300x150.png?text=Image+coming+soon"
        })
        .then(response =>
          setCities((prevCities: Cities) => [...prevCities, response.data])
        );
      setCountry("");
      setCity("");
    } else {
      alert("Enter a city and a country!");
      e.preventDefault();
    }
  };

  return (
    <Accordion style={accordionStyle}>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          <span className="fancySpan">
            Your city is missing? Click here to add it!
          </span>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <form onSubmit={addCityCountryPair}>
              <div className="d-flex justify-content-center">
                <label className="col-form-label mr-1" htmlFor="city">
                  City:
                </label>
                <div className="flex-shrink-0">
                  <input
                    className="form-control"
                    id="city"
                    type="text"
                    value={city}
                    onChange={updateCity}
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

export default AddCity;
