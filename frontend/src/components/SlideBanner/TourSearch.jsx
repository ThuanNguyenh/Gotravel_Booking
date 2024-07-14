import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import "./slide.scss";
import { useEffect, useState } from "react";
import { SearchIcon } from "../../assets/SearchIcon";
import * as ProvinceService from "../../services/ProvinceService";
import axios from "axios";
import { BiSolidBookHeart } from "react-icons/bi";
import { TiLocation } from "react-icons/ti";

const TourSearch = () => {
  const [provinces, setProvinces] = useState([]);

  const [location, setLocation] = useState("");
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

  useEffect(() => {
    async function fetchProvinces() {
      const result = await ProvinceService.resProvince();
      setProvinces(result.map((item) => item));
    }

    fetchProvinces();
  }, []);

  const handleSearch = () => {
    const queryParams = { location, tourType };
    const queryString = new URLSearchParams(queryParams).toString();
    window.location.href = `/search?${queryString}`;
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex w-full shadow-inner border rounded-lg">
        <Autocomplete
          defaultItems={provinces}
          placeholder="Điạ điểm bạn muốn đến?"
          className="location max-w"
          startContent={<TiLocation color="#73D8FC" size={24} />}
          size="sm"
          variant="bordered"
          onSelect={(item) => {
            setLocation(item.target.defaultValue); // Use item.value to capture the selected name
          }}
        >
          {(province) => (
            <AutocompleteItem key={province.id} value={province.name}>
              {province.name}
            </AutocompleteItem>
          )}
        </Autocomplete>

        {/* chủ đề */}
        <Autocomplete
          defaultItems={category}
          placeholder="Thể loại yêu thích?"
          className="type max-w"
          startContent={<BiSolidBookHeart color="#73D8FC" size={24} />}
          size="sm"
          variant="bordered"
          onSelect={(item) => {
            setTourType(item.target.defaultValue); // Use item.value to capture the selected type
          }}
        >
          {(category) => (
            <AutocompleteItem
              key={category.categoryId}
              value={category.categoryName}
            >
              {category.categoryName}
            </AutocompleteItem>
          )}
        </Autocomplete>
      </div>
      <Button
        onClick={handleSearch}
        isIconOnly
        className="shadow-inner rounded-lg border bg-gradient-to-tl text-white to-[#73D8FC] from-cyan-500"
        size="lg"
      >
        <SearchIcon />
      </Button>
    </div>
  );
};

export default TourSearch;
