import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { UserAuthContextProvider } from "./contexts/userAuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <NextUIProvider>
        <UserAuthContextProvider>
          <App />
        </UserAuthContextProvider>
      </NextUIProvider>
    </React.StrictMode>
  </Provider>
);
