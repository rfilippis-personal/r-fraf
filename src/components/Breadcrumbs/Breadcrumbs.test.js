import { render, screen } from "@testing-library/react";
import Breadcrumbs from "./Breadcrumbs";

jest.mock("react-router-dom", () => ({
  useMatches: () => {
    return [
      { id: "0", pathname: "/", params: {}, data: undefined, handle: undefined },
      { id: "0-0", pathname: "/", params: {}, data: undefined, handle: undefined },
    ];
  },
}));

describe("Breadcrumbs tests", () => {
  render(<Breadcrumbs />);
  const breadcrumbsElement = screen.queryByRole("navigation");

  it("Should render correctly", () => {
    expect(breadcrumbsElement).toBeInTheDocument();
  });

  it("Should render a nav component with a class rs-breadcrumb", () => {
    expect(breadcrumbsElement.className === "rs-breadcrumb").toBeTruthy();
  });

  it("Should have a length equal to one on start state", () => {
    expect(breadcrumbsElement.childNodes.length).toBe(1);
  });
});
