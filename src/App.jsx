import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { publicRoutes } from "./routes/route";
import { DefaultLayout } from "./Layouts";
import { Fragment } from "react";
import { UserAuthContextProvider } from "./contexts/userAuthContext";
function App() {
  return (
      <Router>
        <div>
          <UserAuthContextProvider>
            <Routes>
              {publicRoutes.map((route, index) => {
                const Layout = route.layout === null ? Fragment : DefaultLayout;
                const Page = route.component;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page /> 
                      </Layout>
                    }
                  />
                  // Page trở thành children của Layout
                );
              })}
            </Routes>
          </UserAuthContextProvider>
        </div>
      </Router>
  );
}

export default App;
