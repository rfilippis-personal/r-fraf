import { useState } from "react";
import { Input } from "rsuite";
import Container from "../../components/UI/Container/Container";
import { Title } from "../../styles/styles";
import classes from "../ManualFormValidation/manual-form-validation.module.css";
import { Modal, Button } from "rsuite";
import useInput from "../../hooks/use-input";

const ManualFormValidation = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    nameReset();
    lastNameReset();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const {
    value: enteredName,
    valueIsValid: enteredNameIsValid,
    hasError: enteredNameHasError,
    valueChangeHandler: nameInputChangeHandler,
    valerBlurHandler: nameInputBlurHandler,
    reset: nameReset,
  } = useInput((value) => value.trim() !== "");

  const nameClasses = enteredNameHasError
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

  const formIsValid = enteredNameIsValid && enteredLastNameIsValid;

  const subimitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      handleOpen();
    }
  };

  return (
    <Container>
      <Title>Manual Form validation</Title>
      <form onSubmit={subimitHandler}>
        <div className={nameClasses}>
          <label htmlFor="name">Name</label>
          <Input
            id="name"
            value={enteredName}
            onChange={nameInputChangeHandler}
            onBlur={nameInputBlurHandler}
          />
          {enteredNameHasError && (
            <p className={classes["error-text"]}>Name must not be empty.</p>
          )}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor="lastName">Last name</label>
          <Input
            id="lastName"
            value={enteredLastName}
            onChange={lastNameInputChangeHandler}
            onBlur={lastNameInputBlurHandler}
          />
          {enteredLastNameHasError && (
            <p className={classes["error-text"]}>
              Last name must not be empty.
            </p>
          )}
        </div>
        <div className={classes["form-actions"]}>
          <Button disabled={!formIsValid} appearance="primary" type="submit">
            Submit
          </Button>
        </div>
      </form>

      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Your Info is</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <b>Name:</b> {enteredName}
          </p>
          <p>
            <b>Last name:</b> {enteredLastName}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Ok
          </Button>
          <Button onClick={handleCancel} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManualFormValidation;
