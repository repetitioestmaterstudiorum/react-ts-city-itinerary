import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  useContext
} from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const CreateAccount: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("");
  // eslint-disable-next-line
  const [users, setUsers] = useContext(UserContext);

  const createUserSuccess = true;

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
      axios
        .post(`http://localhost:${port}/users/create-account`, {
          email,
          password,
          passwordConfirmation,
          profilePicture
        })
        .then(response => {
          setUsers((prevUsers: Users) => [...prevUsers, response.data]);
        })
        .catch(err => {
          if (err.response.status === 422) {
            alert(JSON.parse(err.response.request.response)[0].msg);
          } else {
            alert(err.response.request.response);
          }
        });
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
    }
  };

  return (
    <section className="conatiner mb-3">
      <div className="text-center">
        {createUserSuccess ? (
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
        ) : (
          <h1>Account created successfully!</h1>
        )}
      </div>
    </section>
  );
};

export default CreateAccount;
