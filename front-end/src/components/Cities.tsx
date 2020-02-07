import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import City from "./City";
import { Form, Row, Col, FormControl } from "react-bootstrap";

const port = process.env.PORT || 5000;

const Cities: React.FC = () => {
  const [cities, setCities] = useState<Cities>([]); // the empty [] declares an empty array at first
  const [filteredCities, setFilteredCities] = useState<Cities>([]);

  const fetchCities = async () => {
    let res = await axios.get(`http://localhost:${port}/cities/all`);
    let data = res.data;
    setCities(data);
    setFilteredCities(data);
    console.log("data", data);
  };

  useEffect(() => {
    fetchCities();
  }, []); // empty [] means running it only once

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilteredCities(cities);
    const inputField = e.target.value;
    setFilteredCities(
      cities.filter(city =>
        city.name.toLowerCase().includes(inputField.toLowerCase())
      )
    );
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="conatiner pt-1">
      <Form
        style={{
          width: "60%",
          margin: "auto"
        }}
        onSubmit={handleOnSubmit}>
        <Form.Group as={Row} controlId="formPlaintextEmail">
          <Form.Label column md="3">
            <span style={{ textDecoration: "underline" }}>Search Cities:</span>
          </Form.Label>
          <Col md="9">
            <FormControl
              type="text"
              placeholder="type ..."
              className="mr-sm-2"
              onChange={handleOnChange}
            />
          </Col>
        </Form.Group>
      </Form>
      <div className="text-center pt-3">
        <h2>Cities</h2>
        {cities &&
          filteredCities.map((city, _id) => <City key={_id} city={city} />)}
      </div>
    </section>
  );
};

export default Cities;
