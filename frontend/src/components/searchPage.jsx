/* eslint-disable no-unused-vars */
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Slider,
} from "@nextui-org/react";
import { LocationIcon } from "../assets/LocationIcon";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ScrollToTopButton from "./alert/ScrollToTopButton";
import "./css/Scroll.css";
import { FaStar } from "react-icons/fa";

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
      const matchesLocation = location
        ? tour.province.includes(location)
        : true;
      const matchesStartDate = startDate
        ? new Date(tour.startDate) >= new Date(startDate)
        : true;
      const matchesEndDate = endDate
        ? new Date(tour.endDate) <= new Date(endDate)
        : true;
      const matchesTourType = tourType
        ? tour.categories.some((category) => category.categoryName === tourType)
        : true;

      return (
        matchesLocation && matchesStartDate && matchesEndDate && matchesTourType
      );
    });

    setFilteredDataTour(filtered);
  };

  // Extract unique categories from the tours
  const extractUniqueCategories = (tours) => {
    const categoriesSet = new Set();
    tours.forEach((tour) => {
      tour.categories.forEach((category) => {
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
    const tourCategories = tour.categories.map((cat) => cat.categoryName);

    const matchesLocation =
      filters.locations.length === 0 ||
      filters.locations.includes(tour.province);
    const matchesCategories =
      filters.categories.length === 0 ||
      filters.categories.some((category) => tourCategories.includes(category));
    const matchesPriceRange =
      tour.priceAdult >= filters.priceRange[0] &&
      tour.priceAdult <= filters.priceRange[1];

    return matchesLocation && matchesCategories && matchesPriceRange;
  });

  // Function to calculate the average rating
  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) {
      return "No ratings"; // Return a message if there are no ratings
    }

    const totalRating = ratings.reduce((acc, curr) => acc + curr, 0);
    const averageRating = totalRating / ratings.length;
    return averageRating.toFixed(1); // Return the average rating rounded to 1 decimal place
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="grid grid-cols-6 md:grid-cols-12 md:gap-5 mt-10">
      {/* Filter table */}
      <div className="flex flex-col col-span-6 md:col-span-3">
        <Card className="p-4 gap-3 shadow-inner border-b rounded-lg max-h-[80vh] overflow-auto custom-scrollbar sticky top-[100px]">
          <div className="font-semibold">Bộ lọc:</div>
          <div className="flex flex-col">
            <h2 className="font-semibold mb-2">Địa điểm</h2>
            {/* Use Set to store unique locations */}
            {Array.from(new Set(dataTour?.map((tour) => tour.province))).map(
              (location) => (
                <label key={location} className="mb-1">
                  <input
                    type="checkbox"
                    value={location}
                    onChange={handleLocationChange}
                  />
                  <span className="ml-2">{location}</span>
                </label>
              )
            )}
          </div>

          <div className="flex flex-col">
            <h2 className="font-semibold mb-2">Loại hình</h2>
            {uniqueCategories?.map((category) => (
              <label key={category} className="block mb-1">
                <input
                  type="checkbox"
                  value={category}
                  onChange={handleCategoryChange}
                />
                <span className="ml-2">{category}</span>
              </label>
            ))}
          </div>

          <div className="flex flex-col">
            <Slider
              className="font-semibold mb-2"
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
      <div className="flex flex-col col-span-9 xl:pt-0 pt-5 gap-3">
        <div className="flex justify-between items-center">
          <div>Có {filteredTours.length} tour phù hợp với bạn</div>
        </div>
        {filteredTours?.map((item, index) => (
          <Card
            shadow="none"
            className="border flex flex-col md:flex-row"
            key={index}
            as={Link}
            to={`/tourDetail/${item.tourId}`}
          >
            <CardBody className="overflow-visible p-0 md:w-1/3">
              <Image
                radius="none"
                width="100%"
                alt="thumbnail"
                className="w-full object-cover h-[180px]"
                src={item.thumbnail}
              />
            </CardBody>
            <CardFooter className="flex flex-col gap-2 items-start md:w-2/3 px-5">
              <b>
                {item.tourName.length > 10
                  ? item.tourName.substring(0, 60) + "..."
                  : item.tourName}
              </b>
              <p className="font-medium text-default-500 text-[14px]">{item.province}</p>
              <div className="flex items-center gap-2 font-medium text-[14px] text-default-500">
                <FaStar
                  style={{
                    color: "#ffa726",
                  }}
                />
                <span>{calculateAverageRating(item.ratings)}</span>
              </div>
              <div className="w-full md:flex-col md:gap-3 flex justify-between custom-card-footer">
                <div className="text-default-500 line-through">
                  {formatPrice(item.priceAdult)}
                  <span className="underline underline-offset-2">đ</span>
                </div>
                <div className="text-cyan-500 font-bold">
                  {formatPrice(
                    item.priceAdult - (item.priceAdult * item.discount) / 100
                  )}
                  <span className="underline underline-offset-2">đ</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <ScrollToTopButton />
    </div>
  );
}

export default Search;
