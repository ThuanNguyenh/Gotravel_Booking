/* eslint-disable no-unused-vars */
import { Button, Card, CardBody, Image, Slider } from "@nextui-org/react";
import { LocationIcon } from "../assets/LocationIcon";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Search() {
  // State to store tour data
  const [dataTour, setDataTour] = useState([]);
  const [filteredDataTour, setFilteredDataTour] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);

  // Get all tours
  const getDataTour = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/tour`);
      setDataTour(response.data);
      filterDataTour(response.data); // Initial filtering
      extractUniqueCategories(response.data); // Extract unique categories
      console.log("Tour list: ", response.data);
    } catch (error) {
      console.log("Error");
    }
  };

  // Extract query parameters from URL
  const getQueryParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      location: params.get("location") || "",
      startDate: params.get("startDate") || "",
      endDate: params.get("endDate") || "",
      tourType: params.get("tourType") || "",
    };
  };

  // Filter tours based on query parameters
  const filterDataTour = (tours) => {
    const { location, startDate, endDate, tourType } = getQueryParams();

    const filtered = tours.filter((tour) => {
      const matchesLocation = location ? tour.province.includes(location) : true;
      const matchesStartDate = startDate ? new Date(tour.startDate) >= new Date(startDate) : true;
      const matchesEndDate = endDate ? new Date(tour.endDate) <= new Date(endDate) : true;
      const matchesTourType = tourType ? tour.categories.some(category => category.categoryName === tourType) : true;

      return matchesLocation && matchesStartDate && matchesEndDate && matchesTourType;
    });

    setFilteredDataTour(filtered);
  };

  // Extract unique categories from the tours
  const extractUniqueCategories = (tours) => {
    const categoriesSet = new Set();
    tours.forEach(tour => {
      tour.categories.forEach(category => {
        categoriesSet.add(category.categoryName);
      });
    });
    setUniqueCategories(Array.from(categoriesSet));
  };

  useEffect(() => {
    getDataTour();
  }, []);

  useEffect(() => {
    if (dataTour.length > 0) {
      filterDataTour(dataTour);
    }
  }, [window.location.search]);

  const [filters, setFilters] = useState({
    locations: [],
    categories: [],
    priceRange: [0, 500],
  });

  const handleLocationChange = (e) => {
    const location = e.target.value;
    let updatedLocations = [...filters.locations];

    if (e.target.checked) {
      updatedLocations.push(location);
    } else {
      updatedLocations = updatedLocations.filter((item) => item !== location);
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      locations: updatedLocations,
    }));
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    let updatedCategories = [...filters.categories];

    if (e.target.checked) {
      updatedCategories.push(category);
    } else {
      updatedCategories = updatedCategories.filter((item) => item !== category);
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      categories: updatedCategories,
    }));
  };

  const handlePriceRangeChange = (values) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      priceRange: values,
    }));
  };

  const filteredTours = filteredDataTour.filter((tour) => {
    const tourCategories = tour.categories.map(cat => cat.categoryName);

    const matchesLocation = filters.locations.length === 0 || filters.locations.includes(tour.province);
    const matchesCategories = filters.categories.length === 0 || filters.categories.some(category => tourCategories.includes(category));
    const matchesPriceRange = tour.price >= filters.priceRange[0] && tour.price <= filters.priceRange[1];

    return matchesLocation && matchesCategories && matchesPriceRange;
  });

  return (
    <div className="grid grid-cols-6 md:grid-cols-12 md:gap-4">
      {/* Filter table */}
      <div className="flex flex-col col-span-3 md:col-span-3 pt-3">
        <Card className="p-5 gap-3">
          <div className="font-semibold text-xl">Bộ lọc</div>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold mb-2">Địa điểm</h2>
            {dataTour.map((tour) => (
              <label key={tour.tourId} className="block mb-1">
                <input type="checkbox" value={tour.province} onChange={handleLocationChange} />
                <span className="ml-2">{tour.province}</span>
              </label>
            ))}
          </div>

          <div className="flex flex-col">
            <h2 className="text-lg font-semibold mb-2">Loại hình</h2>
            {uniqueCategories.map((category) => (
              <label key={category} className="block mb-1">
                <input type="checkbox" value={category} onChange={handleCategoryChange} />
                <span className="ml-2">{category}</span>
              </label>
            ))}
          </div>

          <div className="flex flex-col">
            <Slider
              className="text-lg font-semibold mb-2"
              label="Khoảng giá"
              size="sm"
              hideThumb={true}
              step={50}
              minValue={0}
              maxValue={500}
              defaultValue={[100, 300]}
              formatOptions={{ style: "currency", currency: "USD" }}
              onChange={handlePriceRangeChange}
            />
          </div>
        </Card>
      </div>
      {/* List Filtered */}
      <div className="flex flex-col col-span-9 md:col-span-9 gap-3">
        <div className="flex justify-between p-3 items-center">
          <div className="font-thin text-lg">
            Có <span className="font-semibold">{filteredTours.length}</span> tour phù hợp với bạn.
          </div>
          <div></div>
        </div>
        {filteredTours.map((tour) => (
          <Card key={tour.tourId} isPressable as={Link} to={`/tourDetail/${tour.tourId}`} isBlurred className="border-none bg-background/60 dark:bg-default-100/50" shadow="sm">
            <CardBody>
              <div className="grid grid-cols-6 md:grid-cols-12 md:gap-4 items-center justify-center">
                <div className="col-span-3 md:col-span-3">
                  <Image
                    isBlurred
                    width={300}
                    height={500}
                    shadow="md"
                    src={tour.thumbnail}
                  />
                </div>

                <div className="flex flex-col col-span-5 md:col-span-5 h-full justify-between">
                  
                    <div className="flex flex-col gap-0">
                      <h3 className="font-semibold text-2xl text-foreground/90">{tour.tourName}</h3>
                      <div className="flex flex-row">
                        <LocationIcon />
                        <p className="text-small text-foreground/80 text-[#73D8FC]">{tour.province}</p>
                      </div>
                    </div>

                    <div className="flex flex-row bg-slate-100 w-fit gap-5 p-3 justify-between text-medium font-lights text-slate-500">
                      <div>
                        <h1 className="">Ngày bắt đầu</h1>
                        <h1 className="">{tour.startDate}</h1>
                      </div>
                      <div>
                        <h1 className="">Ngày kết thúc</h1>
                        <h1 className="">{tour.endDate}</h1>
                      </div>
                    </div>
                  
                </div>

                <div className="flex flex-col col-span-4 md:col-span-4 items-end gap-5 text-right h-full  justify-between">
                  <div className="font-semibold text-2xl text-foreground/90">${tour.price}/đêm</div>
                  <div>
                    <Button className="bg-[#73D8FC] text-large text-white font-medium">Đặt chỗ ngay</Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Search;
