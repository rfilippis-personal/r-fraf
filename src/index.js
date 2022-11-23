import React from "react";
import ReactDOM from "react-dom/client";
import { CustomProvider } from "rsuite";
import ptBR from "rsuite/locales/pt_BR";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/layout";
import ErrorPage from "./error-page";
import Link1 from "./pages/Link1/link1";
import Link2 from "./pages/Link2/link2";
import Link3 from "./pages/Link3/link3";
import Home from "./pages/home/home";
import Link4 from "./pages/Link4/link4";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        path: "link1",
        element: <Link1 />,
      },
      {
        path: "link2",
        element: <Link2 />,
      },
      {
        path: "link3",
        element: <Link3 />,
      },
      {
        path: "link4",
        element: <Link4 />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CustomProvider locale={ptBR}>
      <RouterProvider router={router} />
    </CustomProvider>
  </React.StrictMode>
);
