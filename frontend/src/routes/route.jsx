import { HeaderOnly } from "../Layouts";
import Profile from "../components/Auth/Profile";
import CheckOut from "../components/CheckOut";
import Host from "../components/Host/host";
import ListTour from "../components/ListTour";
import TourDetail from "../components/Tour/tourDetail";
import Search from "../components/searchPage";
import Admin from "../components/admin/admin";

import PaymentSuccess from "../components/Payment/PaymentSuccess";
import CheckTour from "../components/checktour";

// Public routes
const publicRoutes = [
  { path: "/", component: ListTour },
  { path: "/tourDetail/:tourId", component: TourDetail, layout: HeaderOnly },
  { path: "/profile", component: Profile, layout: HeaderOnly },
  { path: "/checkout/:tourId", component: CheckOut, layout: HeaderOnly },
  { path: "/search", component: Search },
  {
    path: "/payment/paypal/success",
    component: PaymentSuccess,
    layout: null,
  },

  { path: "/check", component: CheckTour, layout: HeaderOnly },
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
];

export { publicRoutes, privateRoutes };
