import React from "react";
import ReactDOM from "react-dom/client";
import { CustomProvider } from "rsuite";
import ptBR from "rsuite/locales/pt_BR";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/layout";
import ErrorPage from "./error-page";
import RsFormValidation from "./pages/rs-form-validation/rs-form-validation";
import ManualFormValidation from "./pages/manual-form-validation/manual-form-validation";
import RSDinamicFormValidadtion from "./pages/rs-form-dinamic-validation/rs-form-dinamic-validation";
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
        path: "rsFormValidation",
        element: <RsFormValidation />,
        errorElement: <div>opsss, error</div>,
      },
      {
        path: "manualFormValidation",
        element: <ManualFormValidation />,
      },
      {
        path: "rsDinamicFormValidadtion",
        element: <RSDinamicFormValidadtion />,
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
  // <React.StrictMode>
  <CustomProvider locale={ptBR}>
    <RouterProvider router={router} />
  </CustomProvider>
  // </React.StrictMode>
);
