import { Col, Grid, Row } from "rsuite";
import Container from "../../components/UI/container/container";
import { Title } from "../../styles";

const Home = () => {
  return (
    <Container>
      <Title>React base application</Title>
      <Grid>
        <Row>
          <Col>
            <p>What you can use on this app ?</p>
          </Col>
        </Row>
        <Row>
          <ul>
            <li>
              <a
                href="https://pt-br.reactjs.org"
                rel="noreferrer"
                target="_blank"
              >
                React v18
              </a>
            </li>
            <li>
              <a
                href="https://rsuitejs.com/components/overview/"
                rel="noreferrer"
                target="_blank"
              >
                React Suit v5
              </a>
            </li>
            <li>
              <a
                href="https://styled-components.com"
                rel="noreferrer"
                target="_blank"
              >
                Styled Components v5
              </a>
            </li>
            <li>
              <a
                href="https://reactrouter.com/en/main/start/overview"
                rel="noreferrer"
                target="_blank"
              >
                React router dom v6
              </a>
            </li>
          </ul>
        </Row>
      </Grid>
    </Container>
  );
};

export default Home;
