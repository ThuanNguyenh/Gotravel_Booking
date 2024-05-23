/* eslint-disable react/prop-types */
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

export default function SelectAddress({
  label,
  AutocompleteItems,
  value,
  setValue,
  type,
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
              onClick={() =>
                setValue(
                  type === "province"
                    ? item?.province_id
                    : type === "district"
                    ? item?.district_id
                    : item?.ward_id
                )
              }
              key={
                type === "province"
                  ? item?.province_id
                  : type === "district"
                  ? item?.district_id
                  : item?.ward_id
              }
              value={
                type === "province"
                  ? item?.province_id
                  : type === "district"
                  ? item?.district_id
                  : item?.ward_id
              }
            >
              {type === "province"
                ? item?.province_name
                : type === "district"
                ? item?.district_name
                : item?.ward_name}
            </AutocompleteItem>
          );
        })}
      </Autocomplete>
    </div>
  );
}
