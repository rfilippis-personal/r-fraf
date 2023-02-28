import { useRouteError } from "react-router-dom";
import { Message } from "rsuite";
import Header from "./components/Header/Header";
import GlobalStyle from "./styles/globalStyles";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <GlobalStyle />
      <Header />
      <Message type="error" showIcon header="Oops!">
        <div id="error-page">
          <h6>
            <i>Sorry, an unexpected error has occurred.</i>
          </h6>
          <p>
            <b>
              Error: <i style={{ color: "#B94339" }}>{error.statusText || error.message}</i>
            </b>
          </p>
        </div>
      </Message>
    </>
  );
}
