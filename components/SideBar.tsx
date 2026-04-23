import React, { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "./ui/combobox";
import { Input } from "./ui/input";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "./ui/field";
import { Button } from "./ui/button";

type SideBarProps = {
  onHomeownerChange: (value: string) => void;
  onAddressChange: (value: string) => void;
  onSortByChange: (value: string) => void;
  onClearFilter: () => void;
  onShowFavoritesChange: (value: boolean) => void;
};

export const SideBar = ({
  onHomeownerChange,
  onAddressChange,
  onSortByChange,
  onShowFavoritesChange,
  onClearFilter,
}: SideBarProps) => {
  const [homeownerValue, setHomeownerValue] = useState("");
  const [addressValue, setAddressValue] = useState("");
  const [sortByValue, setSortByValue] = useState("");
  const [showFavoritesValue, setShowFavoritesValue] = useState(false);

  const CLEAR_FILTERS_TEXT = "Clear filters";
  const SHOW_FAVORITES_TEXT = "Show Favorites";
  const HOMEOWNER_PLACEHOLDER = "Homeowner";
  const ADDRESS_PLACEHOLDER = "Address";
  const SORT_BY_PLACEHOLDER = "Sort by";
  const LOWEST_PRICE = "Lowest price";
  const HIGHEST_PRICE = "Highest price";
  const NO_ITEMS_FOUND = "No items found.";
  const SORT_BY_ITEMS = [LOWEST_PRICE, HIGHEST_PRICE];

  const resetFilters = () => {
    setHomeownerValue("");
    setAddressValue("");
    setSortByValue("");
    setShowFavoritesValue(false);
    onHomeownerChange("");
    onAddressChange("");
    onSortByChange("");
    onShowFavoritesChange(false);
    onClearFilter();
  };

  return (
    <aside className="fixed left-0 top-18 h-[calc(100vh-72px)] w-64 bg-white shadow-md p-4 flex flex-col gap-4 z-10 pt-8">
      <Input
        data-testid="homeowner-input"
        id="homeowner"
        placeholder={HOMEOWNER_PLACEHOLDER}
        value={homeownerValue}
        onChange={(e) => {
          setHomeownerValue(e.target.value);
          onHomeownerChange(e.target.value);
        }}
      />
      <Input
        data-testid="address-input"
        id="address"
        placeholder={ADDRESS_PLACEHOLDER}
        value={addressValue}
        onChange={(e) => {
          setAddressValue(e.target.value);
          onAddressChange(e.target.value);
        }}
      />
      <Combobox
        items={SORT_BY_ITEMS}
        value={sortByValue}
        onValueChange={(value) => {
          const val = value || "";
          setSortByValue(val);
          onSortByChange(val);
        }}
      >
        <ComboboxInput
          data-testid="sort-by-combobox"
          placeholder={SORT_BY_PLACEHOLDER}
        />
        <ComboboxContent>
          <ComboboxEmpty>{NO_ITEMS_FOUND}</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <FieldGroup>
        <FieldLabel>
          <Field orientation="horizontal">
            <Checkbox
              data-testid="show-favorites-checkbox"
              name="show-favorites"
              checked={showFavoritesValue}
              onCheckedChange={(checked) => {
                setShowFavoritesValue(!!checked);
                onShowFavoritesChange(!!checked);
              }}
            />
            <FieldContent>
              <FieldTitle>{SHOW_FAVORITES_TEXT}</FieldTitle>
            </FieldContent>
          </Field>
        </FieldLabel>
      </FieldGroup>
      <Button
        data-testid="clear-filters-button"
        variant="outline"
        onClick={resetFilters}
      >
        {CLEAR_FILTERS_TEXT}
      </Button>
    </aside>
  );
};
