// import SignupPage from "../pages/AuthPage/SignupPage";
import { HeaderOnly } from "../Layouts";

import Profile from "../components/Auth/Profile";
import CheckOut from "../components/CheckOut";
import ListTour from "../components/ListTour";
import TourDetail from "../components/Tour/tourDetail"
import Search from "../components/search";

// không cần đăng nhập
const publicRoutes = [
    // route
    {path: '/', component: ListTour},
    {path: '/tourDetail/:productId', component:TourDetail, layout: HeaderOnly},
    {path: '/profile', component:Profile, layout: HeaderOnly},
    {path: '/checkout', component:CheckOut, layout: HeaderOnly},
    {path: '/search', component:Search},

];

// bắt buộc đăng nhập
const privateRoutes = [];

export { publicRoutes, privateRoutes};