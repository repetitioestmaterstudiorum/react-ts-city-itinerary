import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext([{}] as any);

export const UserProvider: React.FC = props => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const backendUrl =
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
      setUser(data);
    } catch (err) {}
  };

  useEffect(() => {
    const storageContent = localStorage.getItem("token");
    if (storageContent !== "undefined" && storageContent !== null) {
      if (token !== storageContent) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <UserContext.Provider value={[user, setUser, setToken]}>
      {props.children}
    </UserContext.Provider>
  );
};
