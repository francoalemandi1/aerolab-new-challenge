import React from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "./command";

export default {
  title: "Atoms/Command",
  component: Command,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const Default = {
  render: () => (
    <div style={{ width: "400px" }}>
      <Command>
        <CommandInput placeholder="Search games..." />
        <CommandList>
          <CommandEmpty>No games found.</CommandEmpty>
          <CommandGroup heading="Recent">
            <CommandItem>
              <span>Cyberpunk 2077</span>
            </CommandItem>
            <CommandItem>
              <span>The Witcher 3</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Popular">
            <CommandItem>
              <span>Grand Theft Auto V</span>
              <CommandShortcut>⌘G</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
};

export const EmptyState = {
  render: () => (
    <div style={{ width: "400px" }}>
      <Command>
        <CommandInput placeholder="Search for games..." />
        <CommandList>
          <CommandEmpty>
            No games found. Try searching for something else.
          </CommandEmpty>
        </CommandList>
      </Command>
    </div>
  ),
};
