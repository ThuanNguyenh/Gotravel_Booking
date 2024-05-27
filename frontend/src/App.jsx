import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes/route";
import { DefaultLayout } from "./Layouts";
import { Fragment } from "react";
import { UserAuthContextProvider } from "./contexts/userAuthContext";
import ProtectedRoute from "./contexts/ProtectedRoute"; // Adjust the path as needed

function App() {
  return (
    <Router>
      <div>
        <UserAuthContextProvider>
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;

              let Layout = DefaultLayout;

              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }

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
              );
            })}
            {privateRoutes.map((route, index) => {
              const Page = route.component;

              let Layout = DefaultLayout;

              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <ProtectedRoute requiredRole={route.requiredRole}>
                      <Layout>
                        <Page />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
              );
            })}
          </Routes>
        </UserAuthContextProvider>
      </div>
    </Router>
  );
}

export default App;
