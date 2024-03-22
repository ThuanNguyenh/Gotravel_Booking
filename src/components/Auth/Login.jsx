import { Button, Image, Tab, Tabs} from "@nextui-org/react";
import "./auth.scss";
import { GoogleIcon } from "../../assets/GoogleIcon";
import { FacebookIcon } from "../../assets/FacebookIcon";
import { useUserAuth } from "../../contexts/userAuthContext";
import { useState } from "react";

const Login = () => {
  const { googleSignIn, fbSignIn } = useUserAuth();
  const [selected, setSelected] = useState("login");

  const handleSignInGg = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      alert("lỗi!");
    }
  };

  const handleFb = async () => {
    try {
      await fbSignIn();
    } catch (error) {
      alert("lỗi!");
    }
  };

  return (
    <div>
      <div className="w-full flex justify-center pb-2">
        <Image width={40} src="./Logo.png" />
      </div>
      <Tabs
        selectedKey={selected}
        onSelectionChange={setSelected}      
        variant="underlined"
        fullWidth
        classNames={{
          width: 'full',
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
          <form className="form" action="">
            <input
              placeholder="E-mail"
              id="email"
              name="email"
              type="email"
              className="input"
              required=""
            />
            <input
              placeholder="Password"
              id="password"
              name="password"
              type="password"
              className="input"
              required=""
            />
            <span className="forgot-password">
              <a href="#">Forgot Password ?</a>
            </span>
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

        <Tab
          key="Sign Up"
          title={
            <div className="heading px-2">
              <span>Sign Up</span>
            </div>
          }
        >
          <form className="form" action="">
            <input
              placeholder="Name"
              id="name"
              name="name"
              type="name"
              className="input"
              required=""
            />
            <input
              placeholder="E-mail"
              id="email"
              name="email"
              type="email"
              className="input"
              required=""
            />
            <input
              placeholder="Password"
              id="password"
              name="password"
              type="password"
              className="input"
              required=""
            />

            <input value="Sign Up" type="submit" className="login-button" />
          </form>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Login;
