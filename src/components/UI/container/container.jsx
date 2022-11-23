import { Grid, Row, Col } from "rsuite";

const Container = ({ children }) => {
  return (
    <Grid>
      <Row>
        <Col>{children}</Col>
      </Row>
    </Grid>
  );
};

export default Container;
