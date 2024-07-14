/* eslint-disable react/prop-types */
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

export default function SelectAddress({
  label,
  AutocompleteItems,
  value,
  setValue
}) {
  return (
    <div className="flex flex-col gap-3">
      {/* tỉnh/ thành phố */}
      <Autocomplete
        variant="bordered"
        label={label}
        className="max-w-xs bg-[#F4F4f5] rounded-lg"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {AutocompleteItems?.map((item) => {
          return (
            <AutocompleteItem
              onClick={() => setValue(item?.id)}
              key={item?.id}
              value={item?.id}
            >
              {item?.name}
            </AutocompleteItem>
          );
        })}
      </Autocomplete>
    </div>
  );
}
