import {
  Autocomplete,
  AutocompleteItem,
  Input,
  Button,
} from "@nextui-org/react";
import { animals } from "../../models/data";
import { LocationIcon } from "../../assets/LocationIcon";
import { DateIcon } from "../../assets/DateIcon";

const CarSearch = () => {
  return (
    <div>
      <div className="flex mt-2 mx-2">
        {/* Địa điểm  */}
        <div className="w-1/5">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-neutral-800">Địa điểm thuê xe</h2>
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
        {/* ngày bắt đầu */}
        <div className=" w-1/5">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-neutral-800">Ngày bắt đầu</h2>

            <Input
              placeholder="Thành phố, khách sạn..."
              className="max-w-xs border"
              startContent={<DateIcon />}
              type="date"
              radius="none"
            />
          </div>
        </div>

        {/* giờ bắt đầu */}
        <div className="w-1/5">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-neutral-800">Giờ bắt đầu</h2>

            <Input
              className="max-w-xs border"
              startContent={<DateIcon />}
              type="time"
              radius="none"
            />
          </div>
        </div>

        {/* Ngày kết thúc */}
        <div className="w-1/5">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-neutral-800">Ngày kết thúc</h2>

            <Input
              className="max-w-xs border"
              startContent={<DateIcon />}
              type="date"
              radius="none"
            />
          </div>
        </div>

        {/* khách và phòng */}
        <div className="w-1/5">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-neutral-800">Giờ kết thúc</h2>

            <Input
              className="max-w-xs border"
              startContent={<DateIcon />}
              type="time"
              radius="none"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4 mb-2 mx-2">
        <Button className="text-white bg-blue-500">Tìm kiếm</Button>
      </div>
    </div>
  );
};

export default CarSearch;
