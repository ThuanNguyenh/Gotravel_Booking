import { Autocomplete, AutocompleteItem, Button, Input } from "@nextui-org/react";
import { LocationIcon } from "../../assets/LocationIcon";
import { DateIcon } from "../../assets/DateIcon";
import { PerRoomIcon } from "../../assets/PerRoom";
import "./slide.scss";
import React, { useEffect, useState } from "react";
import { SearchIcon } from "../../assets/SearchIcon";
import * as ProvinceService from "../../services/ProvinceService";
import axios from "axios";

const TourSearch = () => {
  const [provinces, setProvinces] = useState([]);

  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tourType, setTourType] = useState("");
  const [category, setCategory] = useState([]);

  const loadCategory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/directory/categories`
      );
      setCategory(response.data);
    } catch (error) {
      console.log("Error");
    }
  };

  useEffect(() => {
    loadCategory();
  }, []);
  console.log(category)

  useEffect(() => {
    const fetchProvinces = async () => {
      const result = await ProvinceService.resProvince();
      if (result.status === 200) {
        const provinceData = result?.data.results;

        // Get unique provinces
        const uniqueProvinces = [...new Set(provinceData.map(province => province.province_name))]
          .map(name => ({ name })); // Wrap each name in an object

        setProvinces(uniqueProvinces);

      }
    };

    fetchProvinces();
  }, []);

  const handleSearch = () => {
    const queryParams = { location, startDate, endDate, tourType };
    const queryString = new URLSearchParams(queryParams).toString();
    window.location.href = `/search?${queryString}`;
  };

  return (
    <div>
      <div className="flex mt-2 mb-4 ml-2">
        <div className="w-1/4">
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-neutral-800">Địa điểm hoặc thành phố</h2>
            <Autocomplete
              defaultItems={provinces}
              placeholder="Thành phố, địa điểm,..."
              className="location max-w-xs"
              startContent={React.cloneElement(<LocationIcon />, { stroke: "#0194F3" })}
              size="sm"
              variant="bordered"
              onSelect={(item) => {
                console.log("Selected location item:", item); // Log the selected item
                setLocation(item.target.defaultValue); // Use item.value to capture the selected name
              }}
            >
              {(province) => (
                <AutocompleteItem key={province.name} value={province.name}>
                  {province.name}
                </AutocompleteItem>
              )}
            </Autocomplete>
          </div>
        </div>
        <div className="w-1/4">
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-neutral-800">Ngày đi</h2>
            <Input
              className="max-w-xs date"
              startContent={<DateIcon />}
              type="date"
              radius="none"
              size="sm"
              variant="bordered"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
        </div>
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
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <div className="w-1/4">
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-neutral-800">Loại hình</h2>
            <Autocomplete
              defaultItems={category}
              placeholder="Loại hình mong muốn"
              className="type max-w-xs"
              startContent={<PerRoomIcon />}
              size="sm"
              variant="bordered"
              onSelect={(item) => {
                console.log("Selected tour type item:", item); // Log the selected item
                setTourType(item.target.defaultValue); // Use item.value to capture the selected type
              }}
            >
              {(category) => (
                <AutocompleteItem key={category.categoryId} value={category.categoryName}>
                  {category.categoryName}
                </AutocompleteItem>
              )}
            </Autocomplete>
          </div>
        </div>
        <div className="pl-5 pt-2">
          <Button
            onClick={handleSearch}
            isIconOnly
            variant="ghost"
            className="bg-gradient-to-tl text-white to-cyan-500 from-[#73D8FC] mr-4 mt-6"
            size="lg"
            radius="md"
          >
            <SearchIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TourSearch;
