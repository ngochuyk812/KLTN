import { PredictPage } from "../pages";
import { IRoute } from "../interface";

// Admin Page
import AdminPage from "../admin/index";

const publicRoute: Array<IRoute> = [
  {
    path: "/",
    element: PredictPage,
  },
];
const privateRoute: Array<IRoute> = [
  {
    path: "/admin",
    element: AdminPage,
  },
];

export { publicRoute, privateRoute };
