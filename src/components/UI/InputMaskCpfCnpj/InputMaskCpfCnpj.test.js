// Import React Testing Library
import { render, screen } from "@testing-library/react";
import InputMaskCpfCnpj from "./InputMaskCpfCnpj";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

test("Input Mask Component renders correctly", () => {
  render(<InputMaskCpfCnpj onChange={(value) => value} />);
  const inputElement = screen.getByRole("textbox");
  expect(inputElement).toBeInTheDocument();
});

describe("Formatting Values", () => {
  // CPF
  it("formats CPF value correctly", () => {
    render(<InputMaskCpfCnpj onChange={(value) => value} />);
    const inputElement = screen.getByRole("textbox");

    const unmaskedCPF = "11111111111";
    const expectedResult = "111.111.111-11";

    act(() => {
      userEvent.type(inputElement, unmaskedCPF);
      expect(inputElement).toHaveValue(expectedResult);
    });
  });

  // CNPJ
  it("formats CNPJ value correctly", () => {
    render(<InputMaskCpfCnpj onChange={(value) => value} />);
    const inputElement = screen.getByRole("textbox");

    const unmaskedCNPJ = "11111111111111";
    const expectedResult = "11.111.111/1111-11";

    act(() => {
      userEvent.type(inputElement, unmaskedCNPJ);
      expect(inputElement).toHaveValue(expectedResult);
    });
  });

  // Remove trailing characters
  it("removes trailing characters when found", () => {
    render(<InputMaskCpfCnpj onChange={(value) => value} />);
    const inputElement = screen.getByRole("textbox");

    const formatted01 = "111.111.111-11.";
    const expectedResult01 = "111.111.111-11";

    const formatted02 = "11.111.111/1111-11/";
    const expectedResult02 = "11.111.111/1111-11";

    act(() => {
      userEvent.type(inputElement, formatted01);
      expect(inputElement).toHaveValue(expectedResult01);
    });

    act(() => {
      userEvent.type(inputElement, formatted02);
      expect(inputElement).toHaveValue(expectedResult02);
    });
  });
});
