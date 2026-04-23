import { render, screen, fireEvent } from "@testing-library/react";
import { HouseCard } from "./HouseCard";
import { mockHouse } from "@/app/mocks/mockHouses";

describe("HouseCard", () => {
  it("Should call onLikeToggle when heart button is clicked", () => {
    const onLikeToggle = vi.fn();
    render(<HouseCard house={mockHouse} onLikeToggle={onLikeToggle} />);

    fireEvent.click(screen.getByRole("button"));

    expect(onLikeToggle).toHaveBeenCalledWith(mockHouse);
    expect(onLikeToggle).toHaveBeenCalledTimes(1);
  });
});
