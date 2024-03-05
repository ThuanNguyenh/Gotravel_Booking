import React from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Input,
} from "@nextui-org/react";
import { animals } from "../../models/data";
import { LocationIcon } from "../../assets/LocationIcon";
import { DateIcon } from "../../assets/DateIcon";
import { PerRoomIcon } from "../../assets/perRoom";
import "./slide.scss";

const HotelSearch = () => {
  return (
    <div>
      <div className="flex mt-2 mb-4 ml-2">
      {/* đia diem */}
        <div className="w-1/4">
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-neutral-800">
              Địa điểm hoặc tên khách sạn
            </h2>
            <Autocomplete
              defaultItems={animals}
              placeholder="Thành phố, khách sạn..."
              className="location max-w-xs"
              startContent={
                React.cloneElement(<LocationIcon />, {
                  stroke: "#0194F3"
                })
              }
              size="sm"
              variant="bordered"
            >
              {(animal) => (
                <AutocompleteItem key={animal.value}>
                  {animal.label}
                </AutocompleteItem>
              )}
            </Autocomplete>
          </div>
        </div>
        {/* ngày nhận phòng */}
        <div className=" w-1/4">
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-neutral-800">Ngày nhận phòng</h2>

            <Input
              placeholder="Thành phố, khách sạn..."
              className="max-w-xs"
              startContent={<DateIcon />}
              type="date"
              radius="none"
              size="sm"
              variant="bordered"
            />
          </div>
        </div>

        {/* ngày trả phòng */}
        <div className="w-1/4">
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-neutral-800">Ngày trả phòng</h2>
           
            <Input
              placeholder="Thành phố, khách sạn..."
              className="max-w-xs"
              startContent={<DateIcon />}
              type="date"
              radius="none"
              size="sm"
              variant="bordered"
            />
          </div>
        </div>

        {/* khách và phòng */}
        <div className="w-1/4">
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-neutral-800">
              Phòng và khách hàng
            </h2>
            <Autocomplete
              defaultItems={animals}
              placeholder="Phòng và khách hàng"
              className="max-w-xs type"
              startContent={<PerRoomIcon />}
              // radius="none"
              size="sm"
              variant="bordered"
            >
              {(animal) => (
                <AutocompleteItem key={animal.value}>
                  {animal.label}
                </AutocompleteItem>
              )}
            </Autocomplete>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelSearch;
