/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { StarIcon } from "../assets/starIcon";
import { HeartIcon } from "../assets/heart";
import axios from "axios";

function TopTour() {
  // State to store liked status for each tour
  const [dataTour, setDataTour] = useState([]);
  const [likedTours, setLikedProducts] = useState([]);
  const [tourId, setTourId] = useState(null);

  // Function to handle the selection of a tour
  const handleSelectTour = (tourId) => {
    setTourId(tourId);
  };

  // Function to toggle liked status for a tour
  const toggleLike = (index) => {
    setLikedProducts((prevLikedProducts) => {
      const newLikedProducts = [...prevLikedProducts];
      newLikedProducts[index] = !newLikedProducts[index];
      return newLikedProducts;
    });
  };

  // get token from localStorage
  const token = localStorage.getItem("accessToken");

  // get all tour
  const getDataTour = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/tour`);
      setDataTour(response.data);
      console.log("danh sach tour: ", response.data);
    } catch (error) {
      console.log("Error");
    }
  };

  useEffect(() => {
    getDataTour();
  }, []);

  return (
    <div>
      <h1 className="py-10 text-3xl font-extrabold">Top Tour</h1>
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-4">
        {dataTour.map((tour, index) => (
          <Card key={tour.tourId} className="border-small border-blue-400">
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <CardBody className="p-0">
                    <div className="relative group">
                      <Link
                        to={`/tourDetail/${tour.tourId}`}
                        onClick={() => handleSelectTour(tour.tourId)}
                      >
                        <Image
                          isZoomed
                          shadow="sm"
                          radius="lg"
                          width="100%"
                          className="w-full object-cover h-[400px]"
                          src={tour.thumbnail}
                        />
                      </Link>

                      {/* heart button */}
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

                      {/* footer */}
                      <div className="z-10 absolute bottom-0 w-full text-white p-2 flex justify-between bg-gradient-to-t from-[#4bacf1] to-transparent">
                        <div className="relative flex gap-1">
                          <CardFooter className="justify-between">
                            <div className="flex flex-col font-semibold text-lg">
                              <h1 className="">
                                {tour.tourName.length > 10
                                  ? tour.tourName.substring(0, 20) + "..."
                                  : tour.tourName}
                              </h1>
                              <p className="text-medium font-light">
                                {tour.province}
                              </p>
                            </div>
                          </CardFooter>
                        </div>
                        <div className="relative flex gap-1 items-center">
                          <StarIcon />
                          {parseFloat(tour.price).toFixed(1)}
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default TopTour;
