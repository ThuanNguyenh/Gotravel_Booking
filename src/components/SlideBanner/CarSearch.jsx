import {
  Autocomplete,
  AutocompleteItem,
  Input,
} from "@nextui-org/react";
import { animals } from "../../models/data";
import { LocationIcon } from "../../assets/LocationIcon";
import { DateIcon } from "../../assets/DateIcon";
import "./slide.scss";

const CarSearch = () => {

  return (
    <div>
      <div className="flex mt-2 mb-4 ml-2">
        {/* Địa điểm  */}
        <div className="w-1/5">
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-neutral-800">Địa điểm thuê xe</h2>
            <Autocomplete
              defaultItems={animals}
              placeholder="Thành phố, khách sạn..."
              className="max-w-xs location"
              startContent={<LocationIcon />}
              variant="bordered"
              size="sm"
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
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-neutral-800">Ngày bắt đầu</h2>

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

        {/* giờ bắt đầu */}
        <div className="w-1/5">
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-neutral-800">Giờ bắt đầu</h2>

            <Input
              className="max-w-xs"
              startContent={<DateIcon />}
              type="time"
              radius="none"
              size="sm"
              variant="bordered"
            />
          </div>
        </div>

        {/* Ngày kết thúc */}
        <div className="w-1/5">
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-neutral-800">Ngày kết thúc</h2>

            <Input
              className="max-w-xs"
              startContent={<DateIcon />}
              type="date"
              radius="none"
              size="sm"
              variant="bordered"
            />
          </div>
        </div>

        {/* giờ kết thúc */}
        <div className="w-1/5">
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-neutral-800">Giờ kết thúc</h2>

            <Input
              className="max-w-xs type"
              startContent={<DateIcon />}
              type="time"
              size="sm"
              variant="bordered"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarSearch;
