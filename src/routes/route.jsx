// import SignupPage from "../pages/AuthPage/SignupPage";
import { HeaderOnly } from "../Layouts";
import ListTour from "../components/ListTour";
import TourDetail from "../components/Tour/tourDetail"

// không cần đăng nhập
const publicRoutes = [
    // route
    {path: '/', component: ListTour},
    {path: '/tourDetail/:productId', component:TourDetail, layout: HeaderOnly}
];

// bắt buộc đăng nhập
const privateRoutes = [];

export { publicRoutes, privateRoutes};