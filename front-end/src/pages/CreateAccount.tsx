import React, {
  FC,
  Fragment,
  useState,
  ChangeEvent,
  FormEvent,
  useContext
} from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import axios from "axios";
import Browse from "../components/Browse";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Loader from "../components/Loader";

const CreateAccount: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  // const [profilePicture, setProfilePicture] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<any>();
  const [uploadedImage, setUploadedImage] = useState<string>("");
  const [filetypeAlertDone, setFiletypeAlertDone] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [currentUser, setCurrentUser, setToken] = useContext(
    CurrentUserContext
  );
  const backendUrl: string =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/"
      : "https://blooming-beyond-66134.herokuapp.com/";
  const likedItineraries: string[] = [];

  const updateEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const updateFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };
  const updateLastName = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };
  const updatePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const updatePasswordConfirmation = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirmation(e.target.value);
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

  const addUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !email ||
      !firstName ||
      !lastName ||
      !password ||
      !passwordConfirmation ||
      !uploadedImage
    ) {
      alert("Enter a value in all fields and upload an image!");
    } else {
      setIsLoading(true);
      const createAccount = async () => {
        try {
          const resCreateAccount = await axios.post(
            `${backendUrl}users/create-account`,
            {
              email,
              firstName,
              lastName,
              password,
              passwordConfirmation,
              profilePicture: uploadedImage,
              likedItineraries
            }
          );
          setCurrentUser(resCreateAccount);
          let resLogIn = await axios.post(`${backendUrl}users/log-in`, {
            email,
            password
          });
          localStorage.setItem("token", resLogIn.data.token);
          setToken(resLogIn.data.token);
          setIsLoading(false);
        } catch (err) {
          if (err.response.status === 422) {
            alert(JSON.parse(err.response.request.response)[0].msg);
          } else {
            alert(err.response.request.response);
          }
        }
      };
      createAccount();
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
      setUploadedImage("");
    }
  };

  return (
    <section className="conatiner mb-3">
      <div className="text-center">
        {isLoading ? (
          <Loader />
        ) : (
          <Fragment>
            {currentUser && currentUser.email ? (
              <Fragment>
                <h1>Account created successfully.</h1>
                <p>
                  <span className="fancySpan">
                    You were automatically logged in!
                  </span>
                </p>
                <Browse />
              </Fragment>
            ) : (
              <Fragment>
                <h1>Create Account</h1>
                <form onSubmit={addUser}>
                  <div className="d-flex justify-content-center mb-2 mr-1 ml-1">
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
                  <div className="d-flex justify-content-center mt-2 mb-2">
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
                  {filetypeAlertDone && (
                    <div className="d-flex justify-content-center mb-2">
                      <span style={{ color: "#f55f55" }}>
                        The image must be a JPG/JPEG/PNG/GIF
                      </span>
                    </div>
                  )}
                  <div className="d-flex justify-content-center mt-1">
                    <label className="col-form-label mr-1" htmlFor="email">
                      Email:*
                    </label>
                    <div className="flex-shrink-0">
                      <input
                        className="form-control"
                        id="email"
                        type="email"
                        value={email}
                        onChange={updateEmail}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mt-2">
                    <label className="col-form-label mr-1" htmlFor="firstName">
                      First Name:*
                    </label>
                    <div className="flex-shrink-0">
                      <input
                        className="form-control"
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={updateFirstName}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mt-2">
                    <label className="col-form-label mr-1" htmlFor="lastName">
                      Last Name:*
                    </label>
                    <div className="flex-shrink-0">
                      <input
                        className="form-control"
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={updateLastName}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mt-2">
                    <label className="col-form-label mr-1" htmlFor="password">
                      Password:*
                    </label>
                    <div className="flex-shrink-0">
                      <input
                        className="form-control"
                        id="password"
                        type="password"
                        value={password}
                        onChange={updatePassword}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mt-2">
                    <label
                      className="col-form-label mr-1"
                      htmlFor="passwordConfirmation"
                    >
                      Repeat password:*
                    </label>
                    <div className="flex-shrink-0">
                      <input
                        className="form-control"
                        id="passwordConfirmation"
                        type="password"
                        value={passwordConfirmation}
                        onChange={updatePasswordConfirmation}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mt-2">
                    <button
                      className="btn btn-primary"
                      style={{ border: "1px solid #f55f55" }}
                    >
                      Create Account
                    </button>
                  </div>
                </form>
                <h2 className="pt-3">Already have an account?</h2>
                <Link to="/log-in">
                  <Button variant="link" style={{ marginRight: ".25rem" }}>
                    Go to Login
                  </Button>
                </Link>
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    </section>
  );
};

export default CreateAccount;
