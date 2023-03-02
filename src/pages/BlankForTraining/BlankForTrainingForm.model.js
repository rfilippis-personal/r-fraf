import { Schema } from "rsuite";

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  firstName: StringType().isRequired("This field is required."),
  lastName: StringType().isRequired("This field is required."),
  name: StringType(),
  gender: StringType().isRequired("This field is required."),
  age: NumberType("Please enter a valid number.").isRequired("This field is required."),
  cpfCnpj: StringType()
    .isRequired("This field is required.")
    .addRule((value) => value.length === 14 || value.length === 18, "The document size is incomplete"),

  city: StringType().isRequired("This field is required."),
  street: StringType().isRequired("This field is required."),
  email: StringType().isRequired("This field is required.").isEmail("Please input the correct email address"),
});

export default model;
