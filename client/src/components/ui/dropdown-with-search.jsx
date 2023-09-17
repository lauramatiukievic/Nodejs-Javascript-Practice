"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "lib/utils";
import { Button } from "./button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { ScrollArea } from "./scroll-area";

export default function DropdownWithSearch({ dropdownList, value, setValue, searchedValue, setSearchedValue }) {
  const [open, setOpen] = React.useState(false);
  const [isSearchInputInvalid, setIsSearchInputInvalid] = React.useState();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {value ? dropdownList.find((item) => item.id === value)?.label : "Select crypto..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-white">
        <Command>
          {isSearchInputInvalid && <span className="text-red-600 text-xs p-2">Search input must be less than 30</span>}
          <CommandInput
            value={searchedValue}
            placeholder="Search crypto..."
            onValueChange={(value) => {
              if (value.length <= 30) {
                setIsSearchInputInvalid(false);
              } else {
                setIsSearchInputInvalid(true);
              }
              setSearchedValue(value);
            }}
          />
          <CommandEmpty>No crypto found.</CommandEmpty>
          <ScrollArea className="h-80 w-48 rounded-md border">
            <CommandGroup>
              {dropdownList.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === item.id ? "opacity-100" : "opacity-0")} />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
