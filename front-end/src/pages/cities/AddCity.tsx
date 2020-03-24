import React, { useState, ChangeEvent, FormEvent, useContext } from "react";
import { CityContext } from "../../context/CityContext";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import axios from "axios";
import { Accordion, Card } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";

const AddCity: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<any>();
  const [uploadedImage, setUploadedImage] = useState<string>("");
  const [filetypeAlertDone, setFiletypeAlertDone] = useState<boolean>(false);
  // eslint-disable-next-line
  const [cities, setCities] = useContext(CityContext);
  const [currentUser] = useContext(CurrentUserContext);
  const backendUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/"
      : "https://blooming-beyond-66134.herokuapp.com/";

  const updateName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const updateCountry = (e: ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  const containsANumber = (string: string) => {
    return /\d/.test(string);
  };

  const handleImageSelected = (e: ChangeEvent<any>) => {
    if (e.target.files.length === 0) {
      return;
    }
    if (e.target.files[0].name.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
      setSelectedImage(e.target.files[0]);
      setFiletypeAlertDone(false);
    } else {
      alert("The image must be a JPG/JPEG/PNG/GIF");
      setFiletypeAlertDone(true);
      setSelectedImage("");
      return;
    }
  };
  const handleImageUpload = async () => {
    if (!selectedImage) {
      alert("Select an image to upload");
    } else {
      const formData = new FormData();
      formData.append("image", selectedImage, selectedImage.name);
      try {
        const res = await axios.post(
          `${backendUrl}users/image-upload/`,
          formData
        );
        setUploadedImage(res.data.file.location);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const addCityCountryPair = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (containsANumber(name) || containsANumber(country)) {
      alert("City and country must be strings (only letters)!");
    } else if (!name || !country || !uploadedImage) {
      alert("Enter a city, a country and upload an image!");
    } else {
      try {
        const postCity = async () => {
          const res = await axios.post(`${backendUrl}cities/`, {
            name,
            country,
            img: uploadedImage
          });
          setCities((cities: Cities) => [...cities, res.data]);
        };
        postCity();
      } catch (err) {
        console.log(err);
      }
      setCountry("");
      setName("");
      setUploadedImage("");
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
                  <div className="d-flex justify-content-center mb-2">
                    <div
                      style={{
                        position: "relative",
                        marginRight: ".5rem"
                      }}
                    >
                      <input
                        type="file"
                        className="custom-file-input"
                        id="customFile"
                        onChange={handleImageSelected}
                      />
                      <label
                        style={{ paddingRight: "86px" }}
                        className="custom-file-label"
                        htmlFor="customFile"
                      >
                        {selectedImage && !filetypeAlertDone ? (
                          selectedImage.name.substring(0, 10) + "..."
                        ) : (
                          <span>Choose image</span>
                        )}
                      </label>
                    </div>
                    <span className="btn btn-link" onClick={handleImageUpload}>
                      Upload
                    </span>
                  </div>
                  {filetypeAlertDone && (
                    <div className="d-flex justify-content-center mt-2">
                      <span style={{ color: "#f55f55" }}>
                        The image must be a JPG/JPEG/PNG/GIF
                      </span>
                    </div>
                  )}
                  <div className="d-flex justify-content-center mt-2 mb-3">
                    <span style={{ padding: "5px 0" }}>
                      Uploaded Image: &nbsp;
                    </span>
                    <span
                      style={{
                        backgroundColor: uploadedImage ? "#e3ffec" : "#ffe5e3",
                        padding: "5px 10px",
                        borderRadius: "20px"
                      }}
                    >
                      {uploadedImage
                        ? selectedImage.name.substring(0, 20)
                        : "No image uploaded"}
                    </span>
                  </div>
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
                  <div className="d-flex justify-content-center mt-3">
                    <button className="btn btn-primary">Add city</button>
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
