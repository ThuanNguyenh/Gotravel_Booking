import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import getDataFromLocalStorage from "./getDataFromLocalStorage"; // Adjust the path as needed
import PropTypes from "prop-types"; // Import PropTypes

const ProtectedRoute = ({ children, requiredRole }) => {
  const userInfo = getDataFromLocalStorage("userInfo");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo || (requiredRole && !userInfo?.roles.includes(requiredRole))) {
      navigate("/login", { state: { from: location } });
    }
  }, [userInfo, requiredRole, navigate, location]);

  if (!userInfo || (requiredRole && !userInfo?.roles.includes(requiredRole))) {
    return null; // hoặc bạn có thể hiển thị một spinner hoặc thông báo đang chờ
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.func.isRequired, // Add prop validation for onLoginSuccess
  requiredRole: PropTypes.func.isRequired, // Xác thực kiểu dữ liệu và bắt buộc
};

export default ProtectedRoute;
