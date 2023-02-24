import React, { Suspense, useLayoutEffect, useRef, useState } from "react";

import { Form, Button, ButtonToolbar, FlexboxGrid, Drawer, SelectPicker, Affix } from "rsuite";

import Container from "../../components/UI/Container/Container";
import { Title } from "../../styles/styles";

import RSTextField from "../../components/UI/RSTextField/RSTextField";
import model from "./rs-form-validation.model";
import JSONTreeView from "../../components/UI/JSONTreeView/JSONTreeView";
import { getGender } from "./rs-form-validation.services";
import { useLoaderData, defer, Await } from "react-router-dom";
import { getUfs } from "../../services/location.service";
import classes from "../ManualFormValidation/manual-form-validation.module.css";
import { deburr } from "lodash";

const onSearchByUfHandler = (searchKeyword, label) => {
  const _searchKeyword = searchKeyword ? deburr(searchKeyword).toLowerCase() : "";
  return deburr(label).toLowerCase().includes(_searchKeyword);
};

const RsFormValidation = () => {
  const initFormValue = {
    name: "",
    email: "",
    age: "",
    password: "",
    verifyPassword: "",
  };

  const formRef = useRef();
  const [showDrawer, setshowDrawer] = useState(false);

  const [formError, setFormError] = useState({});
  const [formValue, setFormValue] = useState(initFormValue);

  const [cities, setCities] = useState([]);
  const [citiesIsPending, setCitiesIsPending] = useState(false);

  const submitHandler = () => {
    console.log(formRef.current.check());
    console.log(model.check(formValue));
    console.log(model);
    if (!formRef.current.check()) {
      console.error(formError, "Form Errors");
      return;
    }
    setshowDrawer(true);
  };

  const resetFormHandler = () => {
    setFormValue(initFormValue);
    setFormError({});
    formRef.current.cleanErrors();
  };

  const loaderData = useLoaderData();

  useLayoutEffect(() => {
    setCitiesIsPending(true);
    const abortController = new AbortController();
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${formValue.uf}/municipios`;

    setFormValue((formValue) => ({ ...formValue, city: "" }));

    fetch(url, { signal: abortController.signal })
      .then((response) => {
        if (!response.ok) {
          throw Error("Could not fetch the data for that resource");
        }
        return response.json(response);
      })
      .then((data) => {
        data = data.map((city) => {
          return { label: city.nome, value: city.id, structure: city };
        });
        setCities(data);
        setCitiesIsPending(false);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.log(error.message);
          setCitiesIsPending(false);
        }
      });

    return () => abortController.abort();
    // eslint-disable-next-line
  }, [formValue.uf]);

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
            <RSTextField name="verifyPassword" label="Verify password" type="password" />

            <Suspense
              fallback={
                <RSTextField
                  name="uf"
                  label="Uf"
                  accepter={SelectPicker}
                  loading="true"
                  style={{ width: "300px" }}
                  data={[]}
                ></RSTextField>
              }
            >
              <Await resolve={loaderData.ufs}>
                {(resolvedUfs) => {
                  resolvedUfs = resolvedUfs.map((uf) => {
                    return { label: uf.nome, value: uf.sigla };
                  });
                  return (
                    <RSTextField
                      name="uf"
                      label="Uf"
                      searchBy={onSearchByUfHandler}
                      accepter={SelectPicker}
                      preventOverflow
                      style={{ width: "300px" }}
                      data={resolvedUfs}
                    ></RSTextField>
                  );
                }}
              </Await>
            </Suspense>

            {citiesIsPending && (
              <RSTextField name="city" label="City" loading="true" style={{ width: "300px" }} data={[]}></RSTextField>
            )}
            {!citiesIsPending && (
              <RSTextField
                name="city"
                label="City"
                searchBy={onSearchByUfHandler}
                accepter={SelectPicker}
                preventOverflow
                className={classes["select-picker-custom-style"]}
                virtualized
                data={cities}
              ></RSTextField>
            )}

            <ButtonToolbar>
              <Button appearance="primary" onClick={submitHandler}>
                Submit
              </Button>
              <Button onClick={resetFormHandler}>Clear form</Button>
            </ButtonToolbar>
          </Form>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={12}>
          <Affix top={90}>
            <JSONTreeView formValue={formValue} formError={formError} />
          </Affix>
        </FlexboxGrid.Item>
      </FlexboxGrid>

      <Drawer open={showDrawer} size="xs" backdrop={true} onClose={() => setshowDrawer(false)}>
        <JSONTreeView formValue={formValue} formError={formError} />
      </Drawer>
    </Container>
  );
};

export default RsFormValidation;

export async function loader() {
  const genders = getGender();
  const ufs = await getUfs();
  const ufsResolved = await ufs.json();
  return defer({ genders, ufs: ufsResolved });
}
