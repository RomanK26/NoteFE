import { useEffect } from "react";

import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ children }) => {
  const IsAuthenticated = useSelector((state) => state.auth.authenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (IsAuthenticated == false) {
      navigate("/login");
    }
  }, [IsAuthenticated, navigate]);

  if (IsAuthenticated == null) return <div>Loading...</div>;

  return IsAuthenticated ? children : null;
};

export default ProtectedRoutes;
