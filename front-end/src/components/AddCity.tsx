import React, { useState, ChangeEvent, FormEvent, useContext } from "react";
import { CityContext } from "../context/CityContext";

const AddCity: React.FC = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [cities, setCities] = useContext(CityContext);
  console.log("cities", cities);

  const updateCity = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const updateCountry = (e: ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  const addCityCountryPair = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCities((prevCities: Cities) => [
      ...prevCities,
      { name: city, country: country }
    ]);
  };

  return (
    <form onSubmit={addCityCountryPair}>
      <div>
        <label htmlFor="city">City: </label>
        <input
          id="city"
          type="text"
          name="city"
          value={city}
          onChange={updateCity}
        />
      </div>
      <div>
        <label htmlFor="country">Country: </label>
        <input
          id="country"
          type="text"
          name="country"
          value={country}
          onChange={updateCountry}
        />
      </div>
      <button>Add</button>
    </form>
  );
};

export default AddCity;
