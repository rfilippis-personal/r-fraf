import React from "react";
import ReactDOM from "react-dom/client";
import { CustomProvider } from "rsuite";
import ptBR from "rsuite/locales/pt_BR";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/layout";
import ErrorPage from "./error-page";
import RsFormValidation, {
  loader as rsFormValidationLoader,
} from "./pages/rs-form-validation/rs-form-validation";
import ManualFormValidation from "./pages/manual-form-validation/manual-form-validation";
import RSDinamicFormValidadtion from "./pages/rs-form-dinamic-validation/rs-form-dinamic-validation";
import Home from "./pages/home/home";
import LargeCardsList, {
  loader as largeCardsListLoader,
} from "./pages/large-cards-list/large-cards-list";

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
        loader: rsFormValidationLoader,
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
        path: "largeCardsList",
        element: <LargeCardsList />,
        loader: largeCardsListLoader,
        errorElement: <div>opsss, error</div>,
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
