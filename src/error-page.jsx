import { useRouteError } from "react-router-dom";
import Header from "./components/Header/Header";
import Container from "./components/UI/Container/Container";
import GlobalStyle from "./styles/globalStyles";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <GlobalStyle />
      <Header />
      <Container>
        <div id="error-page">
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
        </div>
      </Container>
    </>
  );
}
