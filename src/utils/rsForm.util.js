import { intersection } from "lodash";

const getFormElementsKey = (key) => {
  const arrFormKeys = Array.from(
    document.querySelectorAll("form .rs-form-group > label"),
    (htmlElement) => htmlElement[key]
  );
  return arrFormKeys;
};

const getFormErrorsKey = (model, formValue) => {
  const formCheck = model.check(formValue);
  const arrFormCheck = Object.keys(formCheck).map((key) => ({
    key,
    value: formCheck[key],
  }));

  const arrFormErrorsKey = arrFormCheck
    .filter((currentElement) => currentElement.value.hasError)
    .map((element) => element.key);

  return arrFormErrorsKey;
};

export const getFirstFormErrorKey = (model, formValue) => {
  let firstError;

  const arrFormErrorsKey = getFormErrorsKey(model, formValue);
  const formElementsKey = getFormElementsKey("htmlFor");
  const formElementsHaveError = intersection(formElementsKey, arrFormErrorsKey);

  for (const key of formElementsHaveError) {
    const formElementHasError = arrFormErrorsKey.some(
      (errorKey) => errorKey === key
    );
    if (formElementHasError) {
      firstError = key;
      break;
    }
  }
  return firstError;
};
