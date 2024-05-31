import { Button, Image, Snippet, Tab, Tabs } from "@nextui-org/react";
import "./auth.scss";
import { GoogleIcon } from "../../assets/GoogleIcon";
import { FacebookIcon } from "../../assets/FacebookIcon";
import { useUserAuth } from "../../contexts/userAuthContext";
import { useState } from "react";
import Register from "./Register";
import { Alert } from "../Alert/Alert";
import PropTypes from "prop-types"; // Import PropTypes

// eslint-disable-next-line react/prop-types
const Login = ({ setUserInfo, onLoginSuccess  }) => {
  const { googleSignIn, fbSignIn, emailAndPassword } = useUserAuth();
  const [selected, setSelected] = useState("login");
  const [dataLogin, setDataLogin] = useState();
  const [message, setMessage] = useState(null);

  // input change
  const change = (e) => {
    const { name, value } = e.target;
    setDataLogin({
      ...dataLogin,
      [name]: value,
    });
  };

  // đăng nhập với email và password
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!dataLogin) {
        setMessage("Vui lòng nhập thông tin đăng nhập");
        return;
      }

      const user = await emailAndPassword(dataLogin);

      setMessage(null);
      setUserInfo(user);
      Alert(2000, "Đăng nhập", "Thành công", "success", "OK");
      onLoginSuccess(true); // Notify parent of successful login
    } catch (error) {
      setMessage(error.response.data);
      onLoginSuccess(false); 
    }
  };

  // đăng nhập với google
  const handleSignInGg = async () => {
    try {
      await googleSignIn();
      Alert(2000, "Đăng nhập", "Thành công", "success", "OK");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      onLoginSuccess(true); // Notify parent of successful login
    } catch (error) {
      Alert(2000, "Đăng nhập", "Thất bại", "error", "OK");
      onLoginSuccess(false); // Notify parent of successful login
    }
  };

  // đăng nhập với facebook
  const handleFb = async () => {
    try {
      await fbSignIn();
      Alert(2000, "Đăng nhập", "Thành công", "success", "OK");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      onLoginSuccess(true); // Notify parent of successful login
    } catch (error) {
      Alert(2000, "Đăng nhập", "Thất bại", "error", "OK");
      onLoginSuccess(false); // Notify parent of successful login
    }
  };

  return (
    <div>
      <div className="w-full flex justify-center pb-2">
        <Image width={40} src="/Logo.png" />
      </div>
      <Tabs
        selectedKey={selected}
        onSelectionChange={setSelected}
        variant="underlined"
        fullWidth
        classNames={{
          width: "full",
          tabList:
            "gap-5 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-[#22d3ee]",
          tab: "max-w-full px-0 h-12",
          tabContent: "group-data-[selected=true]:text-[#1089D3]",
        }}
      >
        <Tab
          key="Login"
          title={
            <div className="heading px-2">
              <span>Login</span>
            </div>
          }
        >
          <form className="form" action="" onSubmit={handleLogin}>
            {message && (
              <Snippet
                hideSymbol
                hideCopyButton
                color="danger"
                className={`w-full flex justify-center`}
              >
                {message}
              </Snippet>
            )}

            {/* email */}
            <input
              placeholder="E-mail"
              id="email"
              name="email"
              type="email"
              className="input"
              required=""
              onChange={change}
            />

            {/* mật khẩu */}
            <input
              placeholder="Password"
              id="password"
              name="password"
              type="password"
              className="input"
              required=""
              onChange={change}
            />
            <span className="forgot-password">
              <a href="#">Forgot Password ?</a>
            </span>
            {/* login */}
            <input value="Sign In" type="submit" className="login-button" />
          </form>
          <div className="social-account-container">
            <span className="title">Or Sign in with</span>
            <div className="social-accounts items-center">
              <Button isIconOnly onClick={handleSignInGg} className="bg-white">
                <GoogleIcon />
              </Button>
              <Button isIconOnly onClick={handleFb} className="bg-white">
                <FacebookIcon />
              </Button>
            </div>
          </div>
        </Tab>

        {/* Sign Up */}
        <Tab
          key="Sign Up"
          title={
            <div className="heading px-2">
              <span>Sign Up</span>
            </div>
          }
        >
          <Register />
        </Tab>
      </Tabs>
    </div>
  );
};

Login.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired, // Add prop validation for onLoginSuccess
  setUserInfo: PropTypes.func.isRequired, // Xác thực kiểu dữ liệu và bắt buộc
};

export default Login;
