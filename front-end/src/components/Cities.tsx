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
import { Form } from "react-bootstrap";

const Cities: React.FC = () => {
  const [cities] = useContext(CityContext);
  const [filteredCities, setFilteredCities] = useState<Cities>([]);

  useEffect(() => {
    setFilteredCities(cities);
  }, [cities]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputField = e.target.value;
    setFilteredCities(
      cities.filter((city: City) =>
        (city.name.toLowerCase() + city.country.toLowerCase()).includes(
          inputField.toLowerCase()
        )
      )
    );
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="container text-center">
      <h1>Cities</h1>
      <Form
        style={{
          width: "60%",
          margin: "auto"
        }}
        onSubmit={handleOnSubmit}>
        <div className="d-flex justify-content-center">
          <div className="flex-shrink-0">
            <label className="col-form-label mr-1" htmlFor="city">
              <span className="fancySpan">Search Cities:</span>
            </label>
          </div>
          <div className="flex-shrink-0">
            <input
              placeholder=".. by country or city .."
              className="form-control"
              type="text"
              onChange={handleOnChange}
            />
          </div>
        </div>
      </Form>
      <div className="mt-2">
        <div className="d-flex flex-wrap justify-content-center">
          {filteredCities &&
            filteredCities
              .sort((a: City, b: City) => {
                return a.name > b.name ? 1 : -1;
              })
              .map(city => <City key={city._id} city={city} />)}
        </div>
      </div>
      <AddCity />
    </section>
  );
};

export default Cities;
