import React, {
  FC,
  Fragment,
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  useContext
} from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import axios from "axios";
import Browse from "./Browse";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Loader from "./Loader";

const CreateAccount: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [currentUser, setCurrentUser, setToken] = useContext(
    CurrentUserContext
  );
  const likedItineraries: string[] = [];

  // temporary until user image upload is handled
  useEffect(() => {
    setProfilePicture("https://via.placeholder.com/100x100.png?text=:)");
  }, []);

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

  const addUser = (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    if (!email || !password || !passwordConfirmation) {
      alert("Enter an email, password and password confirmation!");
    } else {
      const backendUrl =
        process.env.NODE_ENV === "development"
          ? "http://localhost:5000/"
          : "https://blooming-beyond-66134.herokuapp.com/";
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
              profilePicture,
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
                  <div className="d-flex justify-content-center">
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
