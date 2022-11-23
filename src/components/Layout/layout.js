import "rsuite/styles/index.less";
import GlobalStyle from "../../globalStyles";
import Header from "../Header/header";
import { Outlet } from "react-router-dom";
import { Container, Content } from "rsuite";

const Layout = () => {
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <Container>
        <Header></Header>
        <Content>
          <Outlet />
        </Content>
        <footer>Powered by rfilippis</footer>
      </Container>
    </>
  );
};

export default Layout;
