import React, { useEffect, useState } from "react";
import api from "../api";
import { jwtDecode } from "jwt-decode";
// import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from "react-router";

const ProtectedRoutes = ({ children }) => {
  const [IsAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    auth().catch(() => setIsAuthenticated(false));
  }, []);

  useEffect(() => {
    if (IsAuthenticated === false) {
      navigate("/login");
    }
  }, [IsAuthenticated, navigate]);

 const refresh = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  try {
    const res = await api.post("/api/token/refresh/", {
      refresh: refreshToken,
    });
    if (res.status === 200) {
      localStorage.setItem("accessToken", res.data.access);
      setIsAuthenticated(true);
      return true;
    } else {
      setIsAuthenticated(false);
      return false;
    }
  } catch (error) {
    console.log("Refresh failed", error);
    setIsAuthenticated(false);
    return false;
  }
};

  const auth = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    const decoded = jwtDecode(token);
    console.log("decoded", decoded);
    const tokenExpiration = Date.now() / 1000;
    if (decoded.exp < tokenExpiration) {
      const refreshed = await refresh();
      if (!refreshed) navigate("/login");
    } else {
      setIsAuthenticated(true);
    }
  };
  if (IsAuthenticated === null) return <div>Loading...</div>;

  return IsAuthenticated ? children : null;
};

export default ProtectedRoutes;
