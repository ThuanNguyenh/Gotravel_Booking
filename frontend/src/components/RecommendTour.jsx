/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { StarIcon } from "../assets/starIcon";
import { HeartIcon } from "../assets/heart";
import axios from "axios";

function RecommendTour() {
  const [allTours, setAllTours] = useState([]);
  const [likedTours, setLikedTours] = useState([]);
  const [tourId, setTourId] = useState(null);

  const handleSelectTour = (tourId) => {
    setTourId(tourId);
  };

  const toggleLike = (index) => {
    setLikedTours((prevLikedTours) => {
      const newLikedTours = [...prevLikedTours];
      newLikedTours[index] = !newLikedTours[index];
      return newLikedTours;
    });
  };

  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) {
      return "No ratings";
    }

    const totalRating = ratings.reduce((acc, curr) => acc + curr, 0);
    const averageRating = totalRating / ratings.length;
    return averageRating.toFixed(1);
  };

  const getDataTour = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/tour`);
      const toursWithAverageRating = response.data.map((tour) => ({
        ...tour,
        averageRating: calculateAverageRating(tour.ratings),
      }));
      setAllTours(toursWithAverageRating);
      console.log("Fetched tours: ", toursWithAverageRating);
    } catch (error) {
      console.log("Error fetching tours", error);
    }
  };

  useEffect(() => {
    getDataTour();
  }, []);


  return (
    <div>
      <h1 className="py-10 text-3xl font-extrabold">Tour</h1>

      <div className="gap-4 grid grid-cols-1 sm:grid-cols-4">
        {allTours.slice(0, 4).map((tour, index) => (
          <Card key={tour.tourId} className="border-small border-blue-400">
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <CardBody className="p-0">
                    <div className="relative group">
                      <Link 
                        to={`/tourDetail/${tour.tourId}`} 
                        onClick={(event) => {
                          handleSelectTour(tour.tourId);
                        }}>
                        <Image
                          shadow="sm"
                          radius="lg"
                          width="100%"
                          className="w-full object-cover h-[300px]"
                          src={tour.thumbnail}
                          alt={tour.tourName}
                        />
                      </Link>
                      <div className="absolute bottom-0 right-0 text-white p-2">
                        <p className="z-10 relative flex gap-1">
                          <StarIcon />
                          {tour.averageRating}
                        </p>
                      </div>
                      <div className="absolute top-0 right-0 text-white p-2">
                        <div className="z-10 relative flex gap-1">
                          <Button
                            isIconOnly
                            className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                            radius="full"
                            variant="light"
                            onPress={() => toggleLike(index)}
                          >
                            <HeartIcon
                              className={
                                likedTours[index]
                                  ? "[&>path]:stroke-transparent"
                                  : ""
                              }
                              fill={likedTours[index] ? "red" : "none"}
                            />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                  <CardFooter className="justify-between">
                    <div className="flex flex-col font-semibold text-lg">
                      <h1 className="">
                        {tour.tourName.length > 10
                          ? tour.tourName.substring(0, 12) + "..."
                          : tour.tourName}
                      </h1>
                      <p className="text-medium font-light">{tour.province}</p>
                      <h1>
                        ${tour.price} <span className="font-light">đêm</span>
                      </h1>
                    </div>
                    <div>
                      <Button
                        radius="full"
                        className="text-white bg-[#4bacf1] font-semibold"
                      >
                        Đặt ngay
                      </Button>
                    </div>
                  </CardFooter>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default RecommendTour;
