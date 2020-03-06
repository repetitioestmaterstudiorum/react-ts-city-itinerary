import React, { useState, ChangeEvent, FormEvent, useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import Browse from "./Browse";

const LogIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // eslint-disable-next-line
  const [user, setToken] = useContext(UserContext);
  const backendUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/"
      : "https://blooming-beyond-66134.herokuapp.com/";

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
      const logIn = async () => {
        try {
          let res = await axios.post(`${backendUrl}users/log-in`, {
            email,
            password
          });
          localStorage.setItem("token", res.data.token);
          setToken(res.data.token);
        } catch (err) {
          alert(err.response.request.response);
        }
      };
      logIn();
      setEmail("");
      setPassword("");
    }
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
            <h1>Log in</h1>
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
                  style={{
                    border: "1px solid #f55f55"
                  }}>
                  Log in
                </button>
              </div>
            </form>
          </React.Fragment>
        )}
      </div>
    </section>
  );
};

export default LogIn;
