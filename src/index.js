import React from "react";
import ReactDOM from "react-dom/client";
import { CustomProvider } from "rsuite";
import ptBR from "rsuite/locales/pt_BR";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import ErrorPage from "./error-page";
import RsFormValidation, {
  loader as rsFormValidationLoader,
} from "./pages/RSFormValidation/RSFormValidation";
import ManualFormValidation from "./pages/ManualFormValidation/ManualFormValidation";
import RSDinamicFormValidadtion from "./pages/RSFormDinamicValidation/RSFormDinamicValidation";
import Home from "./pages/Home/Home";
import LargeCardsList, {
  loader as largeCardsListLoader,
} from "./pages/LargeCardsList/LargeCardsList";

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
