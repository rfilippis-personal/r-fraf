import React, { useRef, useState } from "react";

import { Form, Button, ButtonToolbar, FlexboxGrid, Drawer } from "rsuite";

import Container from "../../components/UI/container/container";
import { Title } from "../../styles";

import RSTextField from "../../components/UI/rsTextField/rsTextField";
import model from "./form-model";
import JSONTreeView from "../../components/UI/json-tree-view/json-tree";

const RsFormValidation = () => {
  const formRef = useRef();
  const [showDrawer, setshowDrawer] = useState(false);

  const initFormValue = {
    name: "",
    email: "",
    age: "",
    password: "",
    verifyPassword: "",
  };

  const [formError, setFormError] = useState({});
  const [formValue, setFormValue] = useState(initFormValue);

  const submitHandler = () => {
    console.log(formRef.current.check());
    console.log(model.check(formValue));
    console.log(model);
    if (!formRef.current.check()) {
      console.error("Form Error");
      return;
    }
    setshowDrawer(true);
  };

  const resetFormHandler = () => {
    setFormValue(initFormValue);
    formRef.current.cleanErrors();
  };

  return (
    <Container>
      <Title>React Suite Form Validation</Title>
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={12}>
          <Form
            ref={formRef}
            onChange={setFormValue}
            onCheck={setFormError}
            formValue={formValue}
            model={model}
            autoComplete="off"
          >
            <RSTextField name="name" label="Username" />
            <RSTextField name="email" label="Email" />
            <RSTextField name="age" label="Age" />
            <RSTextField name="password" label="Password" type="password" />
            <RSTextField
              name="verifyPassword"
              label="Verify password"
              type="password"
            />

            <ButtonToolbar>
              <Button appearance="primary" onClick={submitHandler}>
                Submit
              </Button>
              <Button onClick={resetFormHandler}>Clear form</Button>
            </ButtonToolbar>
          </Form>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={12}>
          <JSONTreeView formValue={formValue} formError={formError} />
        </FlexboxGrid.Item>
      </FlexboxGrid>
      <Drawer
        open={showDrawer}
        size="xs"
        backdrop={true}
        onClose={() => setshowDrawer(false)}
      >
        <JSONTreeView formValue={formValue} formError={formError} />
      </Drawer>
    </Container>
  );
};

export default RsFormValidation;
