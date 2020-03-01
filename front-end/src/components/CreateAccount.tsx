import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  useContext
} from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";

const CreateAccount: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [user, setUser] = useContext(UserContext);

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
      const port = process.env.PORT || 5000;
      const createAccount = async () => {
        try {
          let res = await axios.post(
            `http://localhost:${port}/users/create-account`,
            {
              email,
              password,
              passwordConfirmation,
              profilePicture
            }
          );
          setUser(res.data);
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

  const testUser = {
    _id: "38djkfdls39",
    email: "whatever@yes.com",
    password: "fdsafdsa",
    profilePicture: "https://via.placeholder.com/100x100.png?text=:)"
  };
  const setTestUser = () => {
    setUser(testUser);
  };

  return (
    <section className="conatiner mb-3">
      <div className="text-center">
        {user && user.email ? (
          <React.Fragment>
            <h1>Account created successfully!</h1>
            <Link
              to="/cities"
              className="nav-link"
              style={{ fontSize: "1.8rem" }}
            >
              <p>
                <FaArrowCircleRight /> Browse Cities
              </p>
            </Link>
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
                  htmlFor="passwordConfirmation"
                >
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
                  style={{ border: "1px solid #f55f55" }}
                >
                  Create Account
                </button>
              </div>
            </form>
          </React.Fragment>
        )}
        <div className="container mt-5 mb-4">
          <h2>Set test user</h2>
          <button onClick={setTestUser}>Set test user</button>
        </div>
      </div>
    </section>
  );
};

export default CreateAccount;
