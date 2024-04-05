import { Autocomplete, AutocompleteItem, Button, Input, Link } from "@nextui-org/react";
import { animals } from "../../models/data";
import { LocationIcon } from "../../assets/LocationIcon";
import { DateIcon } from "../../assets/DateIcon";
import { PerRoomIcon } from "../../assets/perRoom";
import "./slide.scss";
import React from "react";
import { SearchIcon } from "../../assets/SearchIcon";

const TourSearch = () => {
  return (
    <div>
      <div className="flex mt-2 mb-4 ml-2">
        {/* địa điểm */}
        <div className="w-1/4">
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-neutral-800">
              Địa điểm hoặc thành phố
            </h2>
            <Autocomplete
              defaultItems={animals}
              placeholder="Thành phố, địa điểm,..."
              className="location max-w-xs"
              startContent={React.cloneElement(<LocationIcon />, {
                stroke: "#0194F3",
              })}
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
        {/* ngày đi */}
        <div className=" w-1/4">
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-neutral-800">Ngày đi</h2>

            <Input
              className="max-w-xs date"
              startContent={<DateIcon />}
              type="date"
              radius="none"
              size="sm"
              variant="bordered"
            />
          </div>
        </div>

        {/* ngay ve */}
        <div className="w-1/4">
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-neutral-800">Ngày về</h2>
            <Input
              className="max-w-xs date"
              startContent={<DateIcon />}
              type="date"
              radius="none"
              size="sm"
              variant="bordered"
            />
          </div>
        </div>

        {/* Loại hình */}
        <div className="w-1/4">
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-neutral-800">Loại hình</h2>
            <Autocomplete
              defaultItems={animals}
              placeholder="Loại hình mong muốn"
              className="type max-w-xs"
              startContent={<PerRoomIcon />}
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
        <div className="pl-5 pt-2">
          <Button
            as={Link}
            href="/search"
            isIconOnly
            variant="ghost"
            className="bg-gradient-to-tl text-white to-cyan-500 from-[#73D8FC] mr-4 mt-6"
            size="lg"
            radius="md"
          >
            <SearchIcon/>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TourSearch;
