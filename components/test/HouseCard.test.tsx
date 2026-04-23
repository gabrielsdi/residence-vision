import { render, screen } from "@testing-library/react";
import { mockHouse } from "@/app/mocks/mockHouses";
import { HouseCard } from "../HouseCard";

describe("HouseCard", () => {
  it("renders house information correctly", () => {
    render(<HouseCard house={mockHouse} />);

    expect(screen.getByText("Calle Falsa 123")).toBeInTheDocument();
    expect(screen.getByText("Jhon Doe")).toBeInTheDocument();
    expect(screen.getByText("$200,000")).toBeInTheDocument();
  });
});
