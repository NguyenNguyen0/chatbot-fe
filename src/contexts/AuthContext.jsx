import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";

import { getUser } from "../services";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const setTokenAndUser = async (token) => {
    getUser(token).then((data) => {
      console.log(data);
      setUser(data);
      sessionStorage.setItem("accessToken", token);
    }).catch((e) => {
      console.log(e.response.data);
      setUser(null);
      sessionStorage.removeItem("accessToken");
    });
  }

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      setTokenAndUser(token);
    } else {
      navigate("/auth");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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