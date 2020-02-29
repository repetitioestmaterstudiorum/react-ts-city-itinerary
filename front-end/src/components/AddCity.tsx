import React, { useState, ChangeEvent, FormEvent, useContext } from "react";
import { CityContext } from "../context/CityContext";
import axios from "axios";
import { Accordion, Card } from "react-bootstrap";

const AddCity: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  // eslint-disable-next-line
  const [cities, setCities] = useContext(CityContext);

  const updateName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const updateCountry = (e: ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  const containsANumber = (string: string) => {
    return /\d/.test(string);
  };

  const addCityCountryPair = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (containsANumber(name) || containsANumber(country)) {
      alert("City and country must be strings (only letters)!");
    } else if (!name || !country) {
      alert("Enter a city and a country!");
    } else {
      const port = process.env.PORT || 5000;
      try {
        const postCity = async () => {
          const res = await axios.post(`http://localhost:${port}/cities/`, {
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
    <Accordion
      style={{
        maxWidth: "400px",
        margin: "10px auto 0"
      }}
    >
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          <span className="fancySpan">Click here to add a city!</span>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
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

export default AddCity;
