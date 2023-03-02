import { render, screen } from "@testing-library/react";
import Breadcrumbs from "./Breadcrumbs";

// Set up a mock version of useMatches()
jest.mock("react-router-dom", () => ({
  useMatches: () => {
    return [
      { id: "0", pathname: "/", params: {}, data: undefined, handle: undefined },
      { id: "0-0", pathname: "/", params: {}, data: undefined, handle: undefined },
    ];
  },
}));

describe("Breadcrumbs should render with a nav object ", () => {
  render(<Breadcrumbs />);
  const BreadcrumbsElement = screen.queryByRole("navigation");

  it("Breadcrumbs should render correctly", () => {
    expect(BreadcrumbsElement).toBeInTheDocument();
  });

  it("should render a nav component with a class rs-breadcrumb", () => {
    render(<Breadcrumbs />);
    const BreadcrumbsElement = screen.queryByRole("navigation");
    expect(BreadcrumbsElement.classList.contains("rs-breadcrumb")).toBeTruthy();
  });
});
