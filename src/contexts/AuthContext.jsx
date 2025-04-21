import propTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

import { getUser } from "../services";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const setTokenAndUser = async (token) => {
    getUser(token).then((data) => {
      setUser(data);
      sessionStorage.setItem("accessToken", token);
    }).catch((e) => {
      console.error(e.response.data);
      setUser(null);
      sessionStorage.removeItem("accessToken");
    });
  }

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      setTokenAndUser(token);
    }
  }, []);


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