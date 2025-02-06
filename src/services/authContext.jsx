/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ childerens }) => {
  const [user, setuser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setuser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, []);

  const login = (email, password) => {
    fetch("https://sleeplyfedev.iboon.in/api/user/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          localStorage.setItem("token", data.token);
          setuser(data.user);
          navigate("/dashboard");
        }
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setuser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {childerens}
    </AuthContext.Provider>
  );
};

export const useAuth = () => { useContext(AuthContext) };
