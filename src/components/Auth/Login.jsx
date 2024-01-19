import { Button, Image } from "@nextui-org/react";
import "./auth.scss";
import { GoogleIcon } from "../../assets/GoogleIcon";
import { FacebookIcon } from "../../assets/FacebookIcon";
import { useUserAuth } from "../../contexts/userAuthContext";

const Login = () => {
  const { googleSignIn, fbSignIn } = useUserAuth();

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
    <div className="container">
      <Image width={40} alt="NextUI hero Image" src="./Logo.png" />

      <div className="mt-4 mb-4 font-medium  text-xl text-slate-600">
        ĐĂNG NHẬP
      </div>

      <Button
        startContent={<GoogleIcon />}
        onClick={handleSignInGg}
        className="bg-primary drop-shadow border text-white font-medium text-base w-full md:w-auto"
      >
        Đăng nhập với Google
      </Button>

      <div className="mt-2 mb-2 text-gray-800">OR</div>

      <Button
        startContent={<FacebookIcon />}
        onClick={handleFb}
        className="bg-white drop-shadow border font-medium text-base w-full md:w-auto"
      >
        Đăng nhập với Facebook
      </Button>
    </div>
  );
};

export default Login;
