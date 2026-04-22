import React, { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "./ui/combobox";
import { Input } from "./ui/input";
import { Field, FieldContent, FieldGroup, FieldLabel, FieldTitle } from "./ui/field";
import { Button } from "./ui/button";

type SidebarProps = {
  onHomeownerChange: (value: string) => void;
  onAddressChange: (value: string) => void;
  onSortByChange: (value: string) => void;
  onClearFilter: () => void;
  onShowFavoritesChange: (value: boolean) => void;
}

export const Sidebar = ({ onHomeownerChange, onAddressChange, onSortByChange, onShowFavoritesChange, onClearFilter }: SidebarProps) => {
  const [homeownerValue, setHomeownerValue] = useState('');
  const [addressValue, setAddressValue] = useState('');
  const [sortByValue, setSortByValue] = useState('');
  const [showFavoritesValue, setShowFavoritesValue] = useState(false);

  const resetFilters = () => {
    setHomeownerValue('');
    setAddressValue('');
    setSortByValue('');
    setShowFavoritesValue(false);
    onHomeownerChange('');
    onAddressChange('');
    onSortByChange('');
    onShowFavoritesChange(false);
    onClearFilter();
  }

  return (   
    <aside className="fixed left-0 top-18 h-[calc(100vh-72px)] w-64 bg-white shadow-md p-4 flex flex-col gap-4 z-10 pt-8">
      <Input
        placeholder="Homeowner"
        value={homeownerValue}
        onChange={(e) => { setHomeownerValue(e.target.value); onHomeownerChange(e.target.value); }}
      />
      <Input
        placeholder="Address"
        value={addressValue}
        onChange={(e) => { setAddressValue(e.target.value); onAddressChange(e.target.value); }}
      />
      <Combobox
        items={['Lowest price', 'Highest price']}
        value={sortByValue}
        onValueChange={(value) => { const val = value || ''; setSortByValue(val); onSortByChange(val); }}
      >
        <ComboboxInput placeholder="Sort by" />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
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
              id="toggle-checkbox-2"
              name="toggle-checkbox-2"
              checked={showFavoritesValue}
              onCheckedChange={(checked) => { setShowFavoritesValue(!!checked); onShowFavoritesChange(!!checked); }}
            />
            <FieldContent>
              <FieldTitle>Show Favorites</FieldTitle>
            </FieldContent>
          </Field>
        </FieldLabel>
      </FieldGroup>
      <Button variant="outline" onClick={resetFilters}>Clear Filter</Button>
    </aside>
  );
}