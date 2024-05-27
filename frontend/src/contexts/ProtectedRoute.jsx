/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import getDataFromLocalStorage from "./getDataFromLocalStorage"; // Adjust the path as needed

const ProtectedRoute = ({ children, requiredRole }) => {
  const userInfo = getDataFromLocalStorage("userInfo");

  if (!userInfo || !userInfo?.roles.includes(requiredRole)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
