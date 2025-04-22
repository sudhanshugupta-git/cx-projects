import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { NotFound } from "./components/NotFound";

export default function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "signup",
          element: <Signup />
        }
      ]
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
