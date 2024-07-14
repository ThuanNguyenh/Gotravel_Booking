/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import axios from "axios";
import SlickCarousel from "../slick/SlickCarousel";
import { TbWorldSearch } from "react-icons/tb";
import { MdOutlineNavigateNext } from "react-icons/md";
import "./home.css";
import { FaStar } from "react-icons/fa6";

function CategoryTour() {
  // State to store liked status for each tour
  const [dataTour, setDataTour] = useState([]);
  const [tourId, setTourId] = useState(null);

  // Function to handle the selection of a tour
  const handleSelectTour = (tourId) => {
    setTourId(tourId);
  };
  // Function to calculate the average rating
  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) {
      return "No ratings"; // Return a message if there are no ratings
    }

    const totalRating = ratings.reduce((acc, curr) => acc + curr, 0);
    const averageRating = totalRating / ratings.length;
    return averageRating.toFixed(1); // Return the average rating rounded to 1 decimal place
  };

  // get all tours
  const getDataTour = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/tour`);
      const toursWithAverageRating = response.data.map((tour) => ({
        ...tour,
        averageRating: calculateAverageRating(tour.ratings),
      }));

      // Sort tours by average rating in descending order
      toursWithAverageRating.sort((a, b) => b.averageRating - a.averageRating);

      setDataTour(toursWithAverageRating);
    } catch (error) {
      console.log("Error fetching tours");
    }
  };

  useEffect(() => {
    getDataTour();
  }, []);

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="flex flex-col gap-4 pt-10">
      <div>
        <p className="text-[24px] font-bold">Tour theo chủ đề</p>
        <div className="flex gap-2 items-end">
          <span>
            <TbWorldSearch color="grey" size={24} />
          </span>
          <p className="text-[14px] font-medium text-default-500">
            Khám phá loại tour bạn yêu thích!
          </p>
        </div>
      </div>
      <div className="flex gap-3">
        <Button
          radius="full"
          variant="flat"
          color="primary"
          className="capitalize"
        >
          Tour tham quan
        </Button>
        <Button
          radius="full"
          variant="flat"
          color="default"
          className="capitalize"
        >
          Tour biển
        </Button>
      </div>

      <SlickCarousel>
        {dataTour?.map((item, index) => (
          <>
            <Link
              to={`/tourDetail/${item.tourId}`}
              onClick={() => handleSelectTour(item.tourId)}
            >
              <Card shadow="none" className="min-h-[280px] border" key={index}>
                <CardBody className="overflow-visible p-0">
                  <Image
                    radius="none"
                    width="100%"
                    alt="thumnail"
                    className="w-full object-cover h-[180px]"
                    src={item.thumbnail}
                  />
                </CardBody>
                <CardFooter className="flex flex-col gap-3 items-start">
                  <b>
                    {item.tourName.length > 10
                      ? item.tourName.substring(0, 60) + "..."
                      : item.tourName}
                  </b>
                  <div className="flex items-center gap-2 font-medium text-default-500">
                    <FaStar
                      style={{
                        color: "#ffa726",
                      }}
                    /> 
                    <span>{calculateAverageRating(item.ratings)}</span>
                  </div>
                  <div className="w-full flex justify-between custom-card-footer">
                    <div className="text-default-500 line-through">
                      {formatPrice(item.priceAdult)}
                      <span className="underline underline-offset-2">đ</span>
                    </div>
                    <div className="text-cyan-500 font-bold">
                      {formatPrice(
                        item.priceAdult -
                          (item.priceAdult * item.discount) / 100
                      )}
                      <span className="underline underline-offset-2">đ</span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          </>
        ))}
      </SlickCarousel>

      <Link to="/search">
          <div className="flex justify-center my-4 font-bold text-primary items-center">
            <span>Xem thêm</span>
            <span><MdOutlineNavigateNext size={18}/></span>
          </div>
      </Link>
    </div>
  );
}

export default CategoryTour;
