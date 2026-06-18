import { createBrowserRouter } from "react-router";

import App from "../App.jsx";
import Home from "../pages/home";
import NotFound from "../pages/NotFound.jsx";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
