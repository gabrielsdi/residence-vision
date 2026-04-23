import { render, screen } from "@testing-library/react";
import { Header } from "../Header";

describe("Header", () => {
  it("Should render the header logo", () => {
    render(<Header />);

    expect(screen.getByTestId("header-logo")).toBeInTheDocument();
  });
});
