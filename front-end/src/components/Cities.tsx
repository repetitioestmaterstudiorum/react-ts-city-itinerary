import React, {
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
  useContext
} from "react";
import City from "./City";
import AddCity from "./AddCity";
import { CityContext } from "../context/CityContext";
import { Form, Row, Col, FormControl } from "react-bootstrap";

const Cities: React.FC = () => {
  // const [cities, setCities] = useState<Cities>([]); // the empty [] declares an empty array at first
  const [cities, setCities] = useContext(CityContext);
  const [filteredCities, setFilteredCities] = useState<Cities>([]);

  useEffect(() => {
    setFilteredCities(cities);
  }, [cities]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputField = e.target.value;
    setFilteredCities(
      cities.filter((city: City) =>
        city.name.toLowerCase().includes(inputField.toLowerCase())
      )
    );
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="conatiner text-center pt-3">
      <h1>Cities</h1>
      <Form
        style={{
          width: "60%",
          margin: "auto"
        }}
        onSubmit={handleOnSubmit}
      >
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
      <div className="pt-1">
        {filteredCities &&
          filteredCities.map(city => <City key={city._id} city={city} />)}
      </div>
      <AddCity />
    </section>
  );
};

export default Cities;
