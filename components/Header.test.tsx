import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

describe("Header", () => {
  it("Should call show Header text on render", () => {
    render(<Header />);

    expect(screen.getByText("Residence Vision")).toBeInTheDocument();
  });
});
