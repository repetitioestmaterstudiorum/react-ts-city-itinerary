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
  // const [cities, setCities] = useState<Cities>([]); // the empty [] declares an empty array at first
  const [cities, setCities] = useContext(CityContext);
  const [filteredCities, setFilteredCities] = useState<Cities>([]);
  console.log("cities", cities);

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
        <div className="d-flex justify-content-center">
          <div className="flex-shrink-0">
            <label className="col-form-label mr-1" htmlFor="city">
              Search Cities:
            </label>
          </div>
          <div className="flex-shrink-0">
            <input
              placeholder="type ..."
              className="form-control"
              type="text"
              onChange={handleOnChange}
            />
          </div>
        </div>
      </Form>
      <div className="pt-1">
        {filteredCities &&
          filteredCities
            .sort((a: City, b: City) => {
              return a.name > b.name ? 1 : -1;
            })
            .map(city => <City key={city._id} city={city} />)}
      </div>
      <AddCity />
    </section>
  );
};

export default Cities;
