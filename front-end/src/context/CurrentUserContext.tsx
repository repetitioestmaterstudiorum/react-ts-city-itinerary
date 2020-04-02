import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

//initialize the context
const initCurrentUserContext: CurrentUserContextInterface = {
  currentUser: null,
  setCurrentUser: (user: User) => {
    throw new Error("setCurrentUser() not implemented");
  },
  setToken: (token: string) => {
    throw new Error("setToken() not implemented");
  }
};

export const CurrentUserContext = createContext<CurrentUserContextInterface>(
  initCurrentUserContext
);

export const CurrentUserProvider: React.FC = props => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const backendUrl: string =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/"
      : "https://blooming-beyond-66134.herokuapp.com/";

  const fetchUser = async (token: string) => {
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
    token ? fetchUser(token) : setCurrentUser(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, currentUser]);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, setToken }}
    >
      {props.children}
    </CurrentUserContext.Provider>
  );
};
