/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import firebase from "../firebaseConfig";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "../redux/userSlice";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

//   function logIn(email, password) {
//     return firebase
//       .auth()
//       .signInWithEmailAndPassword(email, password)
//       .then((currentUser) => {
//         setUser(currentUser.user);
//       });
//   }

  // function signUp(email, password) {
  //   return firebase.auth().createUserWithEmailAndPassword(email, password);
  // }

  async function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    try {
      const result = await firebase.auth().signInWithPopup(googleAuthProvider);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

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

  function logOut() {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(logout());
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
          };

          console.log(userData);

          dispatch(loginSuccess(userData));

          setUser(currentUser);
        } else {
          setUser(null);
        }
      });

    // hủy lắng nghe
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <userAuthContext.Provider
      value={{ user, logOut, googleSignIn, fbSignIn }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
