import React, { Suspense, useRef, useState } from "react";

import {
  Form,
  Button,
  ButtonToolbar,
  FlexboxGrid,
  Drawer,
  SelectPicker,
} from "rsuite";

import Container from "../../components/UI/Container/Container";
import { Title } from "../../styles/styles";

import RSTextField from "../../components/UI/RSTextField/RSTextField";
import model from "./rs-form-validation.model";
import JSONTreeView from "../../components/UI/JSONTreeView/JSONTreeView";
import { getGender } from "./rs-form-validation.services";
import { useLoaderData, defer, Await } from "react-router-dom";

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

  const loaderData = useLoaderData();

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
            <Suspense
              fallback={
                <RSTextField
                  name="gender"
                  label="Gender"
                  accepter={SelectPicker}
                  loading
                  style={{ width: "300px" }}
                  data={[]}
                ></RSTextField>
              }
            >
              <Await resolve={loaderData.genders}>
                {(resolvedGenders) => {
                  return (
                    <RSTextField
                      name="gender"
                      label="Gender"
                      accepter={SelectPicker}
                      style={{ width: "300px" }}
                      data={resolvedGenders}
                    ></RSTextField>
                  );
                }}
              </Await>
            </Suspense>
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

export function loader() {
  const genders = getGender();
  return defer({ genders });
}
