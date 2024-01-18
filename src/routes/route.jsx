// import SignupPage from "../pages/AuthPage/SignupPage";
import { HeaderOnly } from "../Layouts";
import HomePage from "../pages/HomePage";
import ListTourPage from "../pages/ListTourPage";

// không cần đăng nhập
const publicRoutes = [
    // route
    {path: '/', component: HomePage},
    {path: '/list-tour', component: ListTourPage, layout: HeaderOnly},
    
];

// bắt buộc đăng nhập
const privateRoutes = [];

export { publicRoutes, privateRoutes};