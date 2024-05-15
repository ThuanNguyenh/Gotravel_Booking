import { HeaderOnly } from "../Layouts";

import Profile from "../components/Auth/Profile";
import CheckOut from "../components/CheckOut";
import Host from "../components/Host/host";
import ListTour from "../components/ListTour";
import TourDetail from "../components/Tour/tourDetail";
import Search from "../components/search";
import Admin from "../components/admin/admin";

// không cần đăng nhập
const publicRoutes = [

    // route
    {path: '/', component: ListTour},
    {path: '/tourDetail/:productId', component:TourDetail, layout: HeaderOnly},
    {path: '/profile', component:Profile, layout: HeaderOnly},
    {path: '/checkout', component:CheckOut, layout: HeaderOnly},
    {path: '/search', component:Search},
    {path: '/host', component:Host ,layout:HeaderOnly},
    {path: '/admin', component:Admin, layout: HeaderOnly},


];

// bắt buộc đăng nhập
const privateRoutes = [];

export { publicRoutes, privateRoutes };
