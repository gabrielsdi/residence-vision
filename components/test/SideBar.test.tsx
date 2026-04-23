import { fireEvent, render, screen } from "@testing-library/react";
import { SideBar } from "../SideBar";

describe("SideBar", () => {
  it("Should call show SideBar filters on render", () => {
    render(
      <SideBar
        onHomeownerChange={() => {}}
        onAddressChange={() => {}}
        onSortByChange={() => {}}
        onClearFilter={() => {}}
        onShowFavoritesChange={() => {}}
      />,
    );

    expect(screen.getByTestId("homeowner-input")).toBeInTheDocument();
    expect(screen.getByTestId("address-input")).toBeInTheDocument();
    expect(screen.getByTestId("sort-by-combobox")).toBeInTheDocument();
    expect(screen.getByTestId("show-favorites-checkbox")).toBeInTheDocument();
  });

  it("Should call onHomeownerChange when homeowner input changes", () => {
    const onHomeownerChange = vi.fn();
    render(
      <SideBar
        onHomeownerChange={onHomeownerChange}
        onAddressChange={() => {}}
        onSortByChange={() => {}}
        onClearFilter={() => {}}
        onShowFavoritesChange={() => {}}
      />,
    );

    const homeownerInput = screen.getByTestId("homeowner-input");
    fireEvent.change(homeownerInput, { target: { value: "John Doe" } });
    expect(onHomeownerChange).toHaveBeenCalledWith("John Doe");
  });

  it("Should call onAddressChange when address input changes", () => {
    const onAddressChange = vi.fn();
    render(
      <SideBar
        onHomeownerChange={() => {}}
        onAddressChange={onAddressChange}
        onSortByChange={() => {}}
        onClearFilter={() => {}}
        onShowFavoritesChange={() => {}}
      />,
    );

    const addressInput = screen.getByTestId("address-input");
    fireEvent.change(addressInput, { target: { value: "123 Main St" } });
    expect(onAddressChange).toHaveBeenCalledWith("123 Main St");
  });

  it("Should call onShowFavoritesChange when show favorites checkbox changes", () => {
    const onShowFavoritesChange = vi.fn();
    render(
      <SideBar
        onHomeownerChange={() => {}}
        onAddressChange={() => {}}
        onSortByChange={() => {}}
        onClearFilter={() => {}}
        onShowFavoritesChange={onShowFavoritesChange}
      />,
    );

    const showFavoritesCheckbox = screen.getByTestId("show-favorites-checkbox");
    fireEvent.click(showFavoritesCheckbox);
    expect(onShowFavoritesChange).toHaveBeenCalledWith(true);
  });

  it("Should call onClearFilter when clear filter button is clicked", () => {
    const onClearFilter = vi.fn();
    render(
      <SideBar
        onHomeownerChange={() => {}}
        onAddressChange={() => {}}
        onSortByChange={() => {}}
        onClearFilter={onClearFilter}
        onShowFavoritesChange={() => {}}
      />,
    );

    const clearFilterButton = screen.getByTestId("clear-filters-button");
    fireEvent.click(clearFilterButton);
    expect(onClearFilter).toHaveBeenCalled();
  });
});
