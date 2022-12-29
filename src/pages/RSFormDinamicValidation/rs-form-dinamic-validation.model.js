import { Schema } from "rsuite";

const { ArrayType, StringType, NumberType, ObjectType } = Schema.Types;
const model = Schema.Model({
  orderId: StringType()
    .minLength(6, "Minimum 6 characters required")
    .isRequired("Required."),
  products: ArrayType().of(
    ObjectType().shape({
      name: StringType()
        .minLength(6, "Minimum 6 characters required")
        .isRequired("Required."),
      quantity: NumberType().isRequired("Required."),
    })
  ),
});

export default model;
