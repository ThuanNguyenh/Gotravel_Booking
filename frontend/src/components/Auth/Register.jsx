import { useState } from "react";
import axios from "axios";
import { Snippet } from "@nextui-org/react";

function Register() {
  // profile
  const [profile, setProfile] = useState();

  const [message, setMessage] = useState();

  // input change
  const change = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  //display form
  // const [showNameAndPassword, setShowNameAndPassword] = useState(false);

  const handleSignUpClick = async (e) => {
    e.preventDefault();

    if (!profile) {
      return setMessage("Vui lòng điền đầy đủ thông tin.");
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/auth/register`,
        profile
      );

      setMessage(response);
    } catch (error) {
      setMessage(error);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSignUpClick}>
        {message && typeof message === "string" ? (
          <Snippet
            hideSymbol
            hideCopyButton
            color="danger"
            className={`w-full flex justify-center`}
          >
            {message}
          </Snippet>
        ) : (
          message && (
            <Snippet
              hideSymbol
              hideCopyButton
              color={`${message?.status === 200 ? "success" : "danger"}`}
              className={`w-full flex justify-center`}
            >
              {message?.status === 200
                ? message?.data?.message
                : message?.response?.data}
            </Snippet>
          )
        )}

        {/* Email */}
        <input
          onChange={change}
          placeholder="E-mail"
          id="email"
          name="email"
          type="email"
          className="input"
          required=""
        />

        {/* Tên đăng nhập */}

        <input
          onChange={change}
          placeholder="Name"
          id="username"
          name="username"
          type="name"
          className="input"
          required=""
        />

        {/* Mật khẩu */}
        <input
          onChange={change}
          placeholder="Password"
          id="password"
          name="password"
          type="password"
          className="input"
          required=""
        />

        {/*Nhập lại mật khẩu */}
        {/* <input
          onChange={change}
          placeholder="Confirm password"
          id="password"
          name="password"
          type="password"
          className="input"
          required=""
        /> */}

        {/* Button submit */}
        <input
          value="Sign Up"
          type="submit"
          className="login-button"
          // onClick={handleSignUpClick}
        />
      </form>
    </div>
  );
}

export default Register;
