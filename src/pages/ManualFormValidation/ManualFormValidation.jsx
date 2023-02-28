import { Suspense, useLayoutEffect, useState } from "react";
import { Input, InputNumber, SelectPicker } from "rsuite";
import Container from "../../components/UI/Container/Container";
import { Title } from "../../styles/styles";
import classes from "../ManualFormValidation/manual-form-validation.module.css";
import { Button } from "rsuite";
import useInput from "../../hooks/use-input";
import ModalManualFormValidation from "./ModalManualFormValidation";
import { getUfs } from "../../services/location.service";
import { Await, defer, useLoaderData } from "react-router-dom";
import { deburr, find, iteratee, map } from "lodash";

const onSearchByUfHandler = (searchKeyword, label) => {
  const _searchKeyword = searchKeyword ? deburr(searchKeyword).toLowerCase() : "";
  return deburr(label).toLowerCase().includes(_searchKeyword);
};

const ManualFormValidation = () => {
  const [open, setOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const [citiesIsPending, setCitiesIsPending] = useState(false);
  const [ufName, setUfName] = useState("");
  const [cityName, setCityName] = useState("");

  const loaderData = useLoaderData();

  const handleClose = () => {
    setOpen(false);
    nameReset();
    lastNameReset();
    ageNameReset();
    ufNameReset();
    cityNameReset();
  };

  const {
    value: enteredFirstName,
    valueIsValid: enteredFirstNameIsValid,
    hasError: enteredFirstNameHasError,
    valueChangeHandler: firstNameInputChangeHandler,
    valerBlurHandler: firstNameInputBlurHandler,
    reset: nameReset,
  } = useInput((value) => value.trim() !== "");

  const nameClasses = enteredFirstNameHasError
    ? `${classes["form-control"]} ${classes.invalid}`
    : classes["form-control"];

  const {
    value: enteredLastName,
    valueIsValid: enteredLastNameIsValid,
    hasError: enteredLastNameHasError,
    valueChangeHandler: lastNameInputChangeHandler,
    valerBlurHandler: lastNameInputBlurHandler,
    reset: lastNameReset,
  } = useInput((value) => value.trim() !== "");

  const lastNameClasses = enteredLastNameHasError
    ? `${classes["form-control"]} ${classes.invalid}`
    : classes["form-control"];

  const {
    value: enteredAge,
    valueIsValid: enteredAgeIsValid,
    hasError: enteredAgeHasError,
    valueChangeHandler: ageInputChangeHandler,
    valerBlurHandler: ageInputBlurHandler,
    reset: ageNameReset,
  } = useInput((value) => value.trim() !== "" && value > 18);

  const ageClasses = enteredAgeHasError ? `${classes["form-control"]} ${classes.invalid}` : classes["form-control"];

  const {
    value: enteredUf,
    valueIsValid: enteredUfIsValid,
    hasError: enteredUfHasError,
    valueChangeHandler: ufInputChangeHandler,
    valerBlurHandler: ufInputBlurHandler,
    reset: ufNameReset,
  } = useInput((value) => value && String(value).trim() !== "");

  const ufClasses = enteredUfHasError ? `${classes["form-control"]} ${classes.invalid}` : classes["form-control"];

  const {
    value: enteredCity,
    valueIsValid: enteredCityIsValid,
    hasError: enteredCityHasError,
    valueChangeHandler: cityInputChangeHandler,
    valerBlurHandler: cityInputBlurHandler,
    reset: cityNameReset,
  } = useInput((value) => value && String(value).trim() !== "");

  const cityClasses = enteredCityHasError ? `${classes["form-control"]} ${classes.invalid}` : classes["form-control"];

  const formIsValid =
    enteredFirstNameIsValid && enteredLastNameIsValid && enteredAgeIsValid && enteredUfIsValid && enteredCityIsValid;

  const subimitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      setOpen(true);
    }
  };

  useLayoutEffect(() => {
    setCitiesIsPending(true);
    const abortController = new AbortController();
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${enteredUf}/municipios`;

    cityNameReset();

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
  }, [enteredUf]);

  const getFullUf = async () => {
    const ufStructure = await loaderData.ufs;
    return find(ufStructure, ["sigla", enteredUf]);
  };

  const getFullCity = () => {
    const cityStructure = map(cities, iteratee("structure"));
    return find(cityStructure, ["id", enteredCity]);
  };

  const onModalOpenHandler = async () => {
    const uf = await getFullUf();
    const city = getFullCity();
    setUfName(uf.nome);
    setCityName(city.nome);
  };

  return (
    <Container>
      <Title>Manual Form validation</Title>
      <form onSubmit={subimitHandler}>
        <div className={nameClasses}>
          <label htmlFor="firstName">First name</label>
          <Input
            id="firstName"
            value={enteredFirstName}
            onChange={firstNameInputChangeHandler}
            onBlur={firstNameInputBlurHandler}
          />
          {enteredFirstNameHasError && <p className={classes["error-text"]}>Name must not be empty.</p>}
        </div>

        <div className={lastNameClasses}>
          <label htmlFor="lastName">Last name</label>
          <Input
            id="lastName"
            value={enteredLastName}
            onChange={lastNameInputChangeHandler}
            onBlur={lastNameInputBlurHandler}
          />
          {enteredLastNameHasError && <p className={classes["error-text"]}>Last name must not be empty.</p>}
        </div>

        <div className={ageClasses}>
          <label htmlFor="age">Age</label>
          <div className={classes["input-number-container"]}>
            <InputNumber
              id="age"
              min={0}
              max={150}
              maxLength={2}
              value={enteredAge}
              onChange={ageInputChangeHandler}
              onBlur={ageInputBlurHandler}
            />
          </div>
          {enteredAgeHasError && (
            <p className={classes["error-text"]}>Age must not be empty and should be greater than 18</p>
          )}
        </div>

        <div className={ufClasses}>
          <label htmlFor="age">UF</label>
          <Suspense fallback={<SelectPicker loading style={{ width: "300px" }} data={[]}></SelectPicker>}>
            <Await resolve={loaderData.ufs}>
              {(resolvedUfs) => {
                resolvedUfs = resolvedUfs.map((uf) => {
                  return { label: uf.nome, value: uf.sigla, structure: uf };
                });

                return (
                  <SelectPicker
                    searchBy={onSearchByUfHandler}
                    className={classes["select-picker-custom-style"]}
                    value={enteredUf}
                    onChange={ufInputChangeHandler}
                    onBlur={ufInputBlurHandler}
                    data={resolvedUfs}></SelectPicker>
                );
              }}
            </Await>
          </Suspense>
          {enteredUfHasError && <p className={classes["error-text"]}>UF must not be empty.</p>}
        </div>

        <div className={cityClasses}>
          <label htmlFor="age">City</label>

          {citiesIsPending && <SelectPicker loading style={{ width: "300px" }} data={[]}></SelectPicker>}
          {!citiesIsPending && (
            <SelectPicker
              searchBy={onSearchByUfHandler}
              className={classes["select-picker-custom-style"]}
              value={enteredCity}
              virtualized
              onChange={cityInputChangeHandler}
              onBlur={cityInputBlurHandler}
              data={cities}></SelectPicker>
          )}
          {enteredCityHasError && <p className={classes["error-text"]}>City must not be empty.</p>}
        </div>

        <div className={classes["form-actions"]}>
          <Button disabled={!formIsValid} appearance="primary" type="submit">
            Submit
          </Button>
        </div>
      </form>

      <ModalManualFormValidation
        open={open}
        onOpen={onModalOpenHandler}
        handleClose={handleClose}
        handleCancel={() => setOpen(false)}
        enteredFirstName={enteredFirstName}
        enteredLastName={enteredLastName}
        age={enteredAge}
        uf={ufName}
        city={cityName}
      />
    </Container>
  );
};

export default ManualFormValidation;

export async function loader() {
  const ufs = await getUfs();
  const ufsResolved = ufs.json();
  return defer({ ufs: ufsResolved });
}
