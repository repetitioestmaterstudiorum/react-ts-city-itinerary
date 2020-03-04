import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  useContext
} from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import Browse from "./Browse";

const CreateAccount: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [user, setUser, setToken] = useContext(UserContext);

  // temporary until user image upload is handled
  useEffect(() => {
    setProfilePicture("https://via.placeholder.com/100x100.png?text=:)");
  }, []);

  const updateEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const updatePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const updatePasswordConfirmation = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirmation(e.target.value);
  };

  const addUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password || !passwordConfirmation) {
      alert("Enter an email, password and password confirmation!");
    } else {
      const backendUrl =
        process.env.NODE_ENV === "development"
          ? "http://localhost:5000"
          : "https://blooming-beyond-66134.herokuapp.com/";
      const createAccount = async () => {
        try {
          const resCreateAccount = await axios.post(
            `${backendUrl}/users/create-account`,
            {
              email,
              password,
              passwordConfirmation,
              profilePicture
            }
          );
          setUser(resCreateAccount);
          let resLogIn = await axios.post(`${backendUrl}/users/log-in`, {
            email,
            password
          });
          const token = JSON.stringify(resLogIn.data.token);
          localStorage.setItem("token", token);
          setToken(token);
        } catch (err) {
          if (err.response.status === 422) {
            alert(JSON.parse(err.response.request.response)[0].msg);
          } else {
            alert(err.response.request.response);
          }
        }
      };
      createAccount();
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
    }
  };

  return (
    <section className="conatiner mb-3">
      <div className="text-center">
        {user && user.email ? (
          <React.Fragment>
            <h1>Account created successfully!</h1>
            <Browse />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h1>Create Account</h1>
            <form onSubmit={addUser}>
              <div className="d-flex justify-content-center">
                <label className="col-form-label mr-1" htmlFor="email">
                  Email:
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
                <label className="col-form-label mr-1" htmlFor="password">
                  Password:
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
                  htmlFor="passwordConfirmation">
                  Repeat password:
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
                  className="btn btn-link"
                  style={{ border: "1px solid #f55f55" }}>
                  Create Account
                </button>
              </div>
            </form>
          </React.Fragment>
        )}
      </div>
    </section>
  );
};

export default CreateAccount;
