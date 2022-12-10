import { Schema } from "rsuite";

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  name: StringType()
    .minLength(6, "Minimum 6 characters required")
    .isRequired("This field is required."),
  email: StringType()
    .isEmail("Please enter a valid email address.")
    .isRequired("This field is required."),
  age: NumberType("Please enter a valid number.")
    .range(18, 30, "Please enter a number from 18 to 30")
    .isRequired("This field is required."),
  password: StringType().isRequired("This field is required."),
  verifyPassword: StringType()
    .addRule((value, data) => {
      return value === data.password;
    }, "The two passwords do not match")
    .isRequired("This field is required."),
});

export default model;
