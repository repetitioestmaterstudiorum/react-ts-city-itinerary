import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CurrentUserContext = createContext([{}] as any);

export const CurrentUserProvider: React.FC = props => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [token, setToken] = useState();
  const backendUrl: string =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/"
      : "https://blooming-beyond-66134.herokuapp.com/";

  const fetchUser = async (token: object) => {
    try {
      const res = await axios.get(`${backendUrl}users/auth`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = res.data;
      setCurrentUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const storageContent = localStorage.getItem("token");
    if (storageContent !== "undefined" && storageContent !== null) {
      if (token !== storageContent) {
        setToken(storageContent);
      }
    }
  });

  useEffect(() => {
    // fetch user and set state
    token && fetchUser(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <CurrentUserContext.Provider
      value={[currentUser, setCurrentUser, setToken]}>
      {props.children}
    </CurrentUserContext.Provider>
  );
};
