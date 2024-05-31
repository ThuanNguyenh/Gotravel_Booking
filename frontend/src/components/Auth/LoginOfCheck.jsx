import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Login from "./Login";
import getDataFromLocalStorage from "../../contexts/getDataFromLocalStorage";

export default function LoginOfCheck() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(getDataFromLocalStorage("userInfo"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (isLoggedIn) {
      navigate(from); // Chuyển hướng đến URL ban đầu hoặc trang chủ nếu không có URL ban đầu
    }
  }, [isLoggedIn, navigate, from]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[25%]">
        <Login
          setUserInfo={setUserInfo}
          onLoginSuccess={() => setIsLoggedIn(true)}
        />
      </div>
    </div>
  );
}
