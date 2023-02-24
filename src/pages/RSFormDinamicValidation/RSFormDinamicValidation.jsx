import React from "react";

import { Form, Button, ButtonGroup, InputNumber, Input, FlexboxGrid, IconButton, ButtonToolbar, Affix } from "rsuite";
import PlusIcon from "@rsuite/icons/Plus";
import MinusIcon from "@rsuite/icons/Minus";

import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import Container from "../../components/UI/Container/Container";

import { Title } from "../../styles/styles";

import model from "../RSFormDinamicValidation/rs-form-dinamic-validation.model";
import JSONTreeView from "../../components/UI/JSONTreeView/JSONTreeView";

const ErrorMessage = ({ id, children }) => (
  // <span style={{ color: "red" }}>{children}</span>
  <div
    id={`${id}-error-message`}
    role="alert"
    aria-relevant="all"
    className="rs-form-control-message-wrapper rs-form-error-message-wrapper rs-form-error-message-placement-bottom-start"
  >
    <span className="rs-form-error-message rs-form-error-message-show">
      <span className="rs-form-error-message-arrow"></span>
      <span className="rs-form-error-message-inner">{children}</span>
    </span>
  </div>
);
const Cell = ({ children, style, ...rest }) => (
  <td style={{ padding: "2px 4px 2px 0", verticalAlign: "top", ...style }} {...rest}>
    {children}
  </td>
);

const ProductItem = ({ rowValue = {}, onChange, rowIndex, rowError, formSubmited }) => {
  const handleChangeName = (value) => {
    onChange(rowIndex, { ...rowValue, name: value });
  };
  const handleChangeAmount = (value) => {
    onChange(rowIndex, { ...rowValue, quantity: value });
  };

  return (
    <tr>
      <Cell>
        <div className="rs-form-control rs-form-control-wrapper">
          <Input value={rowValue.name} onChange={handleChangeName} style={{ width: 196 }} />
          {rowError?.name.hasError && (formSubmited || rowValue.name) ? (
            <ErrorMessage id={`product-name-${rowIndex}`}>{rowError.name.errorMessage}</ErrorMessage>
          ) : null}
        </div>
      </Cell>
      <Cell>
        <div className="rs-form-control rs-form-control-wrapper">
          <InputNumber min={0} value={rowValue.quantity} onChange={handleChangeAmount} style={{ width: 100 }} />
          {rowError?.quantity?.hasError && (formSubmited || rowValue.quantity) ? (
            <ErrorMessage id={`product-amount-${rowIndex}`}>{rowError.quantity.errorMessage}</ErrorMessage>
          ) : null}
        </div>
      </Cell>
    </tr>
  );
};

const ProductInputControl = ({ value = [], onChange, fieldError, formSubmited }) => {
  const errors = fieldError ? fieldError.array : [];
  const products = value;
  const handleChangeProducts = (nextProducts) => {
    onChange(nextProducts);
  };
  const handleInputChange = (rowIndex, value) => {
    const nextProducts = [...products];
    nextProducts[rowIndex] = value;
    handleChangeProducts(nextProducts);
  };

  const handleMinus = () => {
    handleChangeProducts(products.slice(0, -1));
  };
  const handleAdd = () => {
    handleChangeProducts(products.concat([{ name: "", quantity: null }]));
  };
  return (
    <table>
      <thead>
        <tr>
          <Cell>Product Name</Cell>
          <Cell>Quantity</Cell>
        </tr>
      </thead>
      <tbody>
        {products.map((rowValue, index) => (
          <ProductItem
            key={index}
            rowIndex={index}
            rowValue={rowValue}
            rowError={errors[index] ? errors[index].object : null}
            formSubmited={formSubmited}
            onChange={handleInputChange}
          />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <Cell colSpan={2} style={{ paddingTop: 10 }}>
            <ButtonGroup size="xs">
              <IconButton onClick={handleAdd} icon={<PlusIcon />} />
              <IconButton onClick={handleMinus} icon={<MinusIcon />} />
            </ButtonGroup>
          </Cell>
        </tr>
      </tfoot>
    </table>
  );
};

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
            model={model}
          >
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
