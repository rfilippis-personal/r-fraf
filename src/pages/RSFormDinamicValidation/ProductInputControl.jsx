import React from "react";
import { ButtonGroup, IconButton } from "rsuite";
import PlusIcon from "@rsuite/icons/Plus";
import MinusIcon from "@rsuite/icons/Minus";
import ProductItem, { Cell } from "./ProductItem";

export const ProductInputControl = ({ value = [], onChange, fieldError, formSubmited }) => {
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
