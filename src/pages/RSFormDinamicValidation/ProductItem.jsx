import React from "react";
import { Input, InputNumber } from "rsuite";
import { ErrorMessage } from "./ErrorMessage";

export const Cell = ({ children, style, ...rest }) => (
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

export default ProductItem;
