import { createContext, useEffect, useState } from "react";
import propTypes from "prop-types";

import { getUser } from "../services";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("jwt");
    if (token) {
      setTokenAndUser(token);
    }
  }, []);

  const setTokenAndUser = async (token) => {
    getUser(token).then((data) => {
      console.log(data);
      setUser(data);
      sessionStorage.setItem("jwt", token);
    }).catch((e) => {
      console.log(e.response.data);
      setUser(null);
      sessionStorage.removeItem("jwt");
    });
  }

  return (
    <AuthContext.Provider value={{ user, setUser, setTokenAndUser }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export { AuthProvider, AuthContext };