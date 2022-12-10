import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [enteredValueTouched, setEnteredValueTouched] = useState(false);

  const enteredValueIsValid = validateValue(enteredValue);
  const enteredValueHasError = !enteredValueIsValid && enteredValueTouched;

  const valueInputChangeHandler = (value) => {
    setEnteredValue(value);
  };

  const valueInputBlurHandler = () => {
    setEnteredValueTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setEnteredValueTouched(false);
  };

  return {
    value: enteredValue,
    valueIsValid: enteredValueIsValid,
    hasError: enteredValueHasError,
    valueChangeHandler: valueInputChangeHandler,
    valerBlurHandler: valueInputBlurHandler,
    reset,
  };
};

export default useInput;
