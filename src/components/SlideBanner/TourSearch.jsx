import {
  Autocomplete,
  AutocompleteItem,
  Input,
  Button,
  Link,
} from "@nextui-org/react";
import { animals } from "../../models/data";
import { LocationIcon } from "../../assets/LocationIcon";
import { DateIcon } from "../../assets/DateIcon";
import { PerRoomIcon } from "../../assets/perRoom";
import { NextIcon } from "../../assets/nextIcon";

const TourSearch = () => {
  return (
    <div>
      <div className="flex mt-2 mx-2">
        {/* địa điểm */}
        <div className="w-1/4">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-neutral-800">
              Địa điểm hoặc thành phố
            </h2>
            <Autocomplete
              defaultItems={animals}
              placeholder="Thành phố, địa điểm,..."
              className="max-w-xs border"
              startContent={<LocationIcon />}
              radius="none"
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
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-neutral-800">Ngày đi</h2>

            <Input
              className="max-w-xs border"
              startContent={<DateIcon />}
              type="date"
              radius="none"
            />
          </div>
        </div>

        {/* thời giân */}
        <div className="w-1/4">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-neutral-800">Thời gian</h2>
            <Autocomplete
              defaultItems={animals}
              placeholder="Thời gian đi"
              className="max-w-xs border"
              startContent={<PerRoomIcon />}
              radius="none"
            >
              {(animal) => (
                <AutocompleteItem key={animal.value}>
                  {animal.label}
                </AutocompleteItem>
              )}
            </Autocomplete>
          </div>
        </div>

        {/* khách và phòng */}
        <div className="w-1/4">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-neutral-800">Loại hình</h2>
            <Autocomplete
              defaultItems={animals}
              placeholder="Loại hình mong muốn"
              className="max-w-xs border"
              startContent={<PerRoomIcon />}
              radius="none"
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
      <div className="flex justify-between mt-4 mb-2 mx-2">
        <Link href="/" className="flex items-center">
          <span>Xem ngay</span>
          <span className="ml-2">
            <NextIcon />
          </span>
        </Link>

        <Button className="text-white bg-blue-500">Tìm kiếm</Button>
      </div>
    </div>
  );
};

export default TourSearch;
