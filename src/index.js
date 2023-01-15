import React from "react";
import ReactDOM from "react-dom/client";
import { CustomProvider } from "rsuite";
import ptBR from "rsuite/locales/pt_BR";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
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
        handle: {
          // you can put whatever you want on a route handle
          // here we use "crumb" and return some elements,
          // this is what we'll render in the breadcrumbs
          // for this route
          crumb: () => (
            <Link to="/rsFormValidation">React Suit form validation</Link>
          ),
        },
      },
      {
        path: "manualFormValidation",
        element: <ManualFormValidation />,
        handle: {
          // you can put whatever you want on a route handle
          // here we use "crumb" and return some elements,
          // this is what we'll render in the breadcrumbs
          // for this route
          crumb: () => (
            <Link to="/manualFormValidation">Manual Form Validation</Link>
          ),
        },
      },
      {
        path: "rsDinamicFormValidadtion",
        element: <RSDinamicFormValidadtion />,
        handle: {
          // you can put whatever you want on a route handle
          // here we use "crumb" and return some elements,
          // this is what we'll render in the breadcrumbs
          // for this route
          crumb: () => (
            <Link to="/rsDinamicFormValidadtion">
              React Suit dinamic form validation
            </Link>
          ),
        },
      },
      {
        path: "largeCardsList",
        element: <LargeCardsList />,
        loader: largeCardsListLoader,
        errorElement: <div>opsss, error</div>,
        handle: {
          // you can put whatever you want on a route handle
          // here we use "crumb" and return some elements,
          // this is what we'll render in the breadcrumbs
          // for this route
          crumb: () => <Link to="/largeCardsList">Large cards list</Link>,
        },
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
