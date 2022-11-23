import { Grid, Row, Col } from "rsuite";

const Container = ({ children }) => {
  return (
    <Grid>
      <Row>
        <Col xs={24}>{children}</Col>
      </Row>
    </Grid>
  );
};

export default Container;
