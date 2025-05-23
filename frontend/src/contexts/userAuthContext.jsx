/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import firebase from "../firebaseConfig";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import axios from "axios";
// import Cookies from "js-cookie";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isEmailPasswordLoggedIn, setEmailPasswordLoggedIn] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [redirected, setRedirected] = useState(false);

  // đăng nhập với email và password với server spring
  async function emailAndPassword(dataLogin) {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/auth/login`,
        dataLogin
      );
      localStorage.setItem("accessToken", response.data.data.token);
      localStorage.setItem("userInfo", JSON.stringify(response.data.data.user));
      setEmailPasswordLoggedIn(true);
      setIsAuthenticated(true);
      setRedirected(false);

      // Trả về dữ liệu từ phản hồi của yêu cầu đăng nhập
      return response.data.data.user;
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Lỗi khi đăng nhập:", error);
      throw error; // Ném ra lỗi để xử lý ở phần gọi hàm
    }
  }

  const token = localStorage.getItem("accessToken");

  // đăng nhập với google
  async function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    try {
      const result = await firebase.auth().signInWithPopup(googleAuthProvider);

      return result.user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // đăng nhập với facebook
  async function fbSignIn() {
    const fbProvider = new FacebookAuthProvider();
    try {
      const result = await firebase.auth().signInWithPopup(fbProvider);
      return result;
    } catch (error) {
      console.error("Lỗi Đăng nhập Facebook: ", error);
      throw error;
    }
  }

  // logout server
  const logOutServer = async () => {
    try {
      await axios.post(
        `http://localhost:8080/api/v1/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log("loi roi: ", error);
    }
  };

  function logOut() {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.clear();

        if (isEmailPasswordLoggedIn) {
          logOutServer();
        }
        setEmailPasswordLoggedIn(false);
        setIsAuthenticated(false);
        setRedirected(true);
        return;
      })
      .catch((error) => {
        console.log("lỗi: ", error);
      });
  }

  // lắng nghe trạng thái của người dùng
  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(async (currentUser) => {
        if (currentUser) {
          const userData = {
            userName: currentUser.displayName,
            avatarUrl: currentUser.photoURL,
            email: currentUser.email,
            phoneNumber: currentUser.phoneNumber,
          };

          localStorage.setItem(
            "accessToken",
            currentUser.multiFactor.user.accessToken
          );

          localStorage.setItem("userInfo", JSON.stringify(userData));

          setUser(currentUser);
        } else {
          setUser(null);
        }
      });

    // hủy lắng nghe
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        user,
        isEmailPasswordLoggedIn,
        logOut,
        googleSignIn,
        fbSignIn,
        emailAndPassword,
        isAuthenticated,
        redirected,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export const useUserAuth = () => {
  return useContext(userAuthContext);
};
