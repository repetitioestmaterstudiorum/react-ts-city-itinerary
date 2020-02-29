import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext([{}] as any);

export const UserProvider: React.FC = props => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    console.log('localStorage.getItem("user")', localStorage.getItem("user"));
    if (
      localStorage.getItem("user") === "undefined" ||
      localStorage.getItem("user") === undefined
    ) {
      setUser({
        _id: "",
        email: "",
        password: "",
        profilePicture: ""
      });
    } else {
      const storageContent: any = localStorage.getItem("user");
      setUser(JSON.parse(storageContent));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};
