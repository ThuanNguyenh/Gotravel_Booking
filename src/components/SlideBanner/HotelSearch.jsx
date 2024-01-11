import {
  Autocomplete,
  AutocompleteItem,
  Input,
  Button,
} from "@nextui-org/react";
import { animals } from "../../models/data";
import { LocationIcon } from "../../assets/LocationIcon";
import { DateIcon } from "../../assets/DateIcon";
import { PerRoomIcon } from "../../assets/perRoom";

const HotelSearch = () => {
  return (
    <div>
      <div className="flex mt-2 mx-2">
        <div className="w-1/4">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-neutral-800">
              Địa điểm hoặc tên khách sạn
            </h2>
            <Autocomplete
              defaultItems={animals}
              placeholder="Thành phố, khách sạn..."
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
        {/* ngày nhận phòng */}
        <div className=" w-1/4">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-neutral-800">Ngày nhận phòng</h2>

            <Input
              placeholder="Thành phố, khách sạn..."
              className="max-w-xs border"
              startContent={<DateIcon />}
              type="date"
              radius="none"
            />
          </div>
        </div>

        {/* ngày trả phòng */}
        <div className="w-1/4">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-neutral-800">Ngày trả phòng</h2>
           
            <Input
              placeholder="Thành phố, khách sạn..."
              className="max-w-xs border"
              startContent={<DateIcon />}
              type="date"
              radius="none"
            />
          </div>
        </div>

        {/* khách và phòng */}
        <div className="w-1/4">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-neutral-800">
              Phòng và khách hàng
            </h2>
            <Autocomplete
              defaultItems={animals}
              placeholder="Phòng và khách hàng"
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
      <div className="flex justify-end mt-4 mb-2 mx-2">
        <Button className="text-white bg-blue-500">
          Tìm kiếm
        </Button>
      </div>
    </div>
  );
};

export default HotelSearch;
