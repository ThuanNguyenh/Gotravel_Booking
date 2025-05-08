import { HeaderOnly } from "../Layouts";
import Profile from "../components/Auth/Profile";
import CheckOut from "../components/CheckOut";
import Host from "../components/Host/host";
import ListTour from "../components/homeTour/ListTour";
import TourDetail from "../components/Tour/tourDetail";
import Search from "../components/searchPage";
import Admin from "../components/admin/admin";

import PaymentSuccess from "../components/Payment/PaymentSuccess";
import CheckTour from "../components/checktour";
import LoginOfCheck from "../components/Auth/LoginOfCheck";

// Public routes
const publicRoutes = [
  { path: "/", component: ListTour },
  { path: "/tourDetail/:tourId", component: TourDetail, layout: HeaderOnly },

  { path: "/search", component: Search },

  { path: "/check", component: CheckTour, layout: HeaderOnly },
  { path: "/login", component: LoginOfCheck, layout: null },
];

// Private routes
const privateRoutes = [
  {
    path: "/admin",
    component: Admin,
    layout: HeaderOnly,
    requiredRole: "ROLE_ADMIN",
  },
  {
    path: "/host",
    component: Host,
    layout: HeaderOnly,
    requiredRole: "ROLE_HOST",
  },
  { path: "/profile", component: Profile, layout: HeaderOnly },
  { path: "/checkout/:tourId", component: CheckOut, layout: HeaderOnly },
  {
    path: "/payment/paypal/success",
    component: PaymentSuccess,
    layout: null,
  },
 
];

export { publicRoutes, privateRoutes };
