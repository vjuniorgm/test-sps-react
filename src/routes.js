import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import UserEdit, { userLoader } from "./pages/UserEdit";
import UserAdd from "./pages/UserAdd";
import Login from "./pages/SignIn";

import ProtectedRoute from "./utils/protected";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute element={<Home />} />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/users",
    element: <ProtectedRoute element={<Users />} />,
  },
  {
    path: "/users/:userId",
    element: <ProtectedRoute element={<UserEdit />} />,
    loader: userLoader,
  },
  {
    path: "/users/add",
    element: <ProtectedRoute element={<UserAdd />} />,
  },
]);

export default router;
