import React, {
  FC,
  Fragment,
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
  useContext
} from "react";
import City from "./City";
import AddCity from "./AddCity";
import { CityContext } from "../../context/CityContext";
import { Form } from "react-bootstrap";
import Loader from "../../components/Loader";

const Cities: FC = () => {
  const { cities, fetchCities } = useContext(CityContext);
  const [inputField, setInputField] = useState("");

  useEffect(() => {
    if (!cities) fetchCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterCities = () => {
    return cities
      ? cities.filter((city: City) =>
          (city.name.toLowerCase() + city.country.toLowerCase()).includes(
            inputField.toLowerCase()
          )
        )
      : [];
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputField(value);
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="container text-center pt-1">
      <h1>Cities</h1>
      {cities ? (
        <Fragment>
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
              {cities &&
                filterCities()
                  .sort((a: City, b: City) => {
                    return a.name > b.name ? 1 : -1;
                  })
                  .map(city => <City key={city._id} city={city} />)}
            </div>
          </div>
          <AddCity />
        </Fragment>
      ) : (
        <Fragment>
          <Loader />
          <p className="pt-3" style={{ fontStyle: "italic" }}>
            This might take a while if the heroku container is sleeping! (it's a
            free container..)
          </p>
        </Fragment>
      )}
    </section>
  );
};

export default Cities;
