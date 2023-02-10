import "rsuite/styles/index.less";
import GlobalStyle from "../../styles/globalStyles";
import Header from "../Header/Header";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { Container, Content } from "rsuite";

const Layout = () => {
  return (
    <>
      <GlobalStyle />
      <ScrollRestoration />
      <Container>
        <Header />
        <Content>
          <Outlet />
        </Content>
        <footer>Powered by rfilippis</footer>
      </Container>
    </>
  );
};

export default Layout;
