import { render, screen } from "@testing-library/react";
import Container from "./Container";

it("renders with children", () => {
  render(
    <Container>
      <p>Hello World</p>
    </Container>
  );
  const element = screen.queryByRole("grid");
  expect(element).toBeInTheDocument();

  const children = screen.queryByText("Hello World");
  expect(children).toBeInTheDocument();
});
