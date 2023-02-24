import StringMask from "string-mask";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { Input } from "rsuite";

const DELIMITERS = [".", "-", "/"];
const CPF_MASK = "000.000.000-00";
const CNPJ_MASK = "00.000.000/0000-00";

const InputMaskCpfCnpj = React.forwardRef((props, ref) => {
  const { value, onChange, ...rest } = props;
  const [inputValue, setInputValue] = useState("");

  const formatValue = useCallback((str) => {
    const unmaskedValue = str.replace(/[.\-/]/g, "").trim();
    let mask = CPF_MASK;

    if (unmaskedValue.length > 11) mask = CNPJ_MASK;

    const formatted = StringMask.process(unmaskedValue, mask);
    return removeTrailingCharIfFound(formatted.result, DELIMITERS);
  }, []);

  useLayoutEffect(() => {
    if (value) {
      const formatedValue = formatValue(value);
      onChange(formatedValue);
    }
    // eslint-disable-next-line
  }, []);

  function onChangeHandler(value) {
    const formatedValue = formatValue(value);
    setInputValue(formatedValue);
    return formatedValue;
  }

  function removeTrailingCharIfFound(str, chars) {
    let result = str;

    chars.forEach((c) => {
      if (str[str.length - 1] === c) {
        result = str.slice(0, str.length - 1);
      }
    });

    return result;
  }

  return (
    <>
      <Input
        type="text"
        value={value || inputValue}
        onChange={(value) => {
          onChange(onChangeHandler(value));
        }}
        {...rest}
      />
    </>
  );
});

export default InputMaskCpfCnpj;
