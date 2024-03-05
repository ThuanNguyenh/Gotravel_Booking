// import SignupPage from "../pages/AuthPage/SignupPage";
import { HeaderOnly } from "../Layouts";
import Home from "../components/Home";
import ListTour from "../components/ListTour";

// không cần đăng nhập
const publicRoutes = [
    // route
    {path: '/', component: Home},
    {path: '/list-tour', component: ListTour, layout: HeaderOnly},
    
];

// bắt buộc đăng nhập
const privateRoutes = [];

export { publicRoutes, privateRoutes};