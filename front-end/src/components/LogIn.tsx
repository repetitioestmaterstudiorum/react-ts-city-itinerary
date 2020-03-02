import React, {
  useState,
  // useEffect,
  ChangeEvent,
  FormEvent,
  useContext
} from "react";
import { UserContext } from "../context/UserContext";
// import axios from "axios";
import Browse from "./Browse";
import Button from "react-bootstrap/Button";

const LogIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useContext(UserContext);

  const updateEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const updatePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Enter email and password!");
    } else {
      setEmail("");
      setPassword("");
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
            <h1>Logged in successfully!</h1>
            <Browse />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h1>Create Account</h1>
            <form onSubmit={handleLogin}>
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
                <button
                  className="btn btn-link"
                  style={{ border: "1px solid #f55f55" }}>
                  Log in
                </button>
                <Button href="http://localhost:5000/">FB Login</Button>
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

export default LogIn;
