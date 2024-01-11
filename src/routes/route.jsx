// import SignupPage from "../pages/AuthPage/SignupPage";
import HomePage from "../pages/HomePage";

// không cần đăng nhập
const publicRoutes = [
    // route
    {path: '/', component: HomePage},
    
];

// bắt buộc đăng nhập
const privateRoutes = [];

export { publicRoutes, privateRoutes};