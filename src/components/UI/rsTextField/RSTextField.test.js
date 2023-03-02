import { screen, render, act } from "@testing-library/react";
import RSTextField from "./RSTextField";
import { Form } from "rsuite";
import userEvent from "@testing-library/user-event";
import SelectPicker from "rsuite";

it("renders an input from react suite", () => {
  render(
    <Form>
      <RSTextField name="inputTest" label="Input test" />
    </Form>
  );

  const inputElement = screen.getByRole("textbox", { name: "Input test", type: "text" });
  expect(inputElement).toBeInTheDocument();

  act(() => {
    userEvent.type(inputElement, "First Name");
    expect(inputElement).toHaveValue("First Name");
  });
});

it("renders an select from react suite with and pre selected a value", () => {
  render(
    <Form>
      <RSTextField
        name="gender"
        label="Gender"
        defaultValue="M"
        accepter={SelectPicker}
        data={[
          [
            { value: "M", label: "Male" },
            { value: "F", label: "Female" },
          ],
        ]}></RSTextField>
    </Form>
  );

  const inputElement = screen.getByRole("textbox", { name: "Gender", type: "text" });
  expect(inputElement).toBeInTheDocument();
  expect(inputElement).toHaveValue("M");
});
