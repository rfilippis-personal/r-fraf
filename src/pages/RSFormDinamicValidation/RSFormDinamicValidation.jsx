import React from "react";

import { Form, Button, Input, FlexboxGrid, ButtonToolbar, Affix } from "rsuite";

import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import Container from "../../components/UI/Container/Container";

import { Title } from "../../styles/styles";

import model from "../RSFormDinamicValidation/rs-form-dinamic-validation.model";
import JSONTreeView from "../../components/UI/JSONTreeView/JSONTreeView";
import { ProductInputControl } from "./ProductInputControl";

const RSDinamicFormValidadtion = () => {
  const formRef = React.useRef();
  const [submit, setSubmit] = React.useState(false);
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    orderId: "",
    products: [{ name: "", quantity: null }],
  });

  const cleanValidationsHandler = () => {
    setSubmit(false);
    setFormError({});
    formRef.current.cleanErrors();
  };

  const submitHandler = () => {
    setSubmit(true);
    formRef.current.check();
  };

  const changeFormHandler = (value) => {
    setFormValue(value);
  };

  return (
    <Container>
      <Title>React Suit Dinamic form validation</Title>
      <FlexboxGrid>
        <FlexboxGridItem colspan={12}>
          <Form
            ref={formRef}
            onSubmit={submitHandler}
            onChange={changeFormHandler}
            onCheck={setFormError}
            formValue={formValue}
            model={model}>
            <Form.Group controlId="orderId">
              <Form.ControlLabel>Order ID</Form.ControlLabel>
              <Form.Control name="orderId" accepter={Input} />
            </Form.Group>

            <Form.Control
              name="products"
              accepter={ProductInputControl}
              fieldError={formError.products}
              formSubmited={submit}
            />

            <hr />
            <ButtonToolbar>
              <Button appearance="primary" type="submit">
                Submit
              </Button>
              <Button onClick={cleanValidationsHandler}>Clean validations</Button>
            </ButtonToolbar>
          </Form>
        </FlexboxGridItem>

        <FlexboxGrid.Item colspan={12}>
          <Affix top={90}>
            <JSONTreeView formValue={formValue} formError={formError} />
          </Affix>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Container>
  );
};

export default RSDinamicFormValidadtion;
