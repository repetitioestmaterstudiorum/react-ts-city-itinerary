import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext([{}] as any);

export const UserProvider: React.FC = props => {
  const [users, setUsers] = useState<Users>();

  useEffect(() => {
    const port = process.env.PORT || 5000;
    const fetchUsers = async () => {
      let res = await axios.get(`http://localhost:${port}/users/all`);
      let data = res.data;
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={[users, setUsers]}>
      {props.children}
    </UserContext.Provider>
  );
};
