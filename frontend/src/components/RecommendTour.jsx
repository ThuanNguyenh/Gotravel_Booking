// /* eslint-disable no-unused-vars */
// import { useState, useEffect } from "react";
// import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
// import { Link } from "react-router-dom";
// import { StarIcon } from "../assets/starIcon";
// import { HeartIcon } from "../assets/heart";
// import axios from "axios";

// function RecommendTour() {
// // State to store liked status for each product
// const [dataTour, setDataTour] = useState([]);
// const [likedTours, setLikedProducts] = useState([]);
// const [tourId, setTourId] = useState(null);

// // Function to handle the selection of a tour
// const handleSelectTour= (tourId) => {
//   setTourId(tourId);
// };

//   // Function to toggle liked status for a product
//   const toggleLike = (index) => {
//     setLikedProducts((prevLikedProducts) => {
//       const newLikedProducts = [...prevLikedProducts];
//       newLikedProducts[index] = !newLikedProducts[index];
//       return newLikedProducts;
//     });
//   };

//   // get token from localStorage
//   const token = localStorage.getItem("accessToken");

// // get all tour
// const getDataTour = async () => {
//   try {
//     const response = await axios.get(
//       `http://localhost:8080/api/v1/tour`
//     );
//     setDataTour(response.data);
//     console.log("danh sach tour: ", response.data);
//   } catch (error) {
//     console.log("Error")
//   }
// };

// useEffect(() => {
//   getDataTour();
// }, []);

//   return (
//     <div>
//       <h1 className="py-10 text-3xl font-extrabold">Recommend Tour</h1>
//       <div className="gap-4 grid grid-cols-1 sm:grid-cols-4">
//         {dataTour.map((tour, index) => (
//           <Card key={tour.tourId} className="border-small border-blue-400">
//             <div className="flip-card">
//               <div className="flip-card-inner">
//                 <div className="flip-card-front">
//                   <CardBody className="p-0">
//                     <div className="relative group">
//                       <Link to={`/tourDetail/${tour.tourId}`} onClick={() => handleSelectTour(tour.tourId)}>
//                         <Image
//                           shadow="sm"
//                           radius="lg"
//                           width="100%"
//                           className="w-full object-cover h-[300px]"
//                           src={tour.thumbnail}
//                           alt={tour.tourName}
//                         />
//                       </Link>
//                       <div className="absolute bottom-0 right-0 text-white p-2">
//                         <p className="z-10 relative flex gap-1">
//                           <StarIcon />
//                           {parseFloat(tour.discount).toFixed(1)}
//                         </p>
//                       </div>
//                       <div className="absolute top-0 right-0 text-white p-2">
//                         <div className="z-10 relative flex gap-1">
//                           <Button
//                             isIconOnly
//                             className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
//                             radius="full"
//                             variant="light"
//                             onPress={() => toggleLike(index)}
//                           >
//                             <HeartIcon
//                               className={
//                                 likedTours[index]
//                                   ? "[&>path]:stroke-transparent"
//                                   : ""
//                               }
//                               fill={likedTours[index] ? "red" : "none"}
//                             />
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                   </CardBody>
//                   <CardFooter className="justify-between">
//                     <div className="flex flex-col font-semibold text-lg">
//                       <h1 className="">
//                         {tour.tourName.length > 10
//                           ? tour.tourName.substring(0, 12) + "..."
//                           : tour.tourName}
//                       </h1>
//                       <p className="text-medium font-light">{tour.province}</p>
//                       <h1>
//                         ${tour.price} <span className="font-light">đêm</span>
//                       </h1>
//                     </div>
//                     <div>
//                       <Button
//                         radius="full"
//                         className="text-white bg-[#4bacf1] font-semibold"
//                       >
//                         Đặt ngay
//                       </Button>
//                     </div>
//                   </CardFooter>
//                 </div>
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default RecommendTour;

import { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { StarIcon } from "../assets/starIcon";
import { HeartIcon } from "../assets/heart";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../src/index.css";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import axios from "axios";
function RecommendTour() {
  // State to store liked status for each product
  const [dataTour, setDataTour] = useState([]);
  const [tourId, setTourId] = useState(null);

  // Function to handle the selection of a tour
  const handleSelectTour = (tourId) => {
    setTourId(tourId);
  };

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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("https://dummyjson.com/products");
  //       const data = await response.json();
  //       // Limit the products to the first 20 items
  //       const first20Products = data.products.slice(0, 8);
  //       setDataTour(first20Products);
  //     } catch (error) {
  //       console.error("Error fetching product data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div>
      <h1 className="py-10 text-3xl font-extrabold">Recommended Tour</h1>
      <div className="">
        <Swiper
          loop={true}
          slidesPerView={4}
          spaceBetween={30}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper"
          loa
        >
          {dataTour?.map((product, index) => (
            <>
              <SwiperSlide>
                <Card key={product?.tourId} className="border-small border-blue-400">
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <CardBody className="p-0">
                          <div className="relative group">
                            <Link to={`/tourDetail/${product?.tourId}`}>
                              <Image
                                style={{ height: "200px" }}
                                shadow="sm"
                                radius="lg"
                                width="100%"
                                className="w-full object-cover h-[300px]"
                                src={product.thumbnail}
                                alt={product.title}
                              />
                            </Link>
                            <div className="absolute bottom-0 right-0 text-white p-2">
                              <p className="z-10 relative flex gap-1">
                                <StarIcon />
                                {parseFloat(product.ratings).toFixed(1)}
                              </p>
                            </div>
                            <div className="absolute top-0 right-0 text-white p-2">
                              <div className="z-10 relative flex gap-1"></div>
                            </div>
                          </div>
                        </CardBody>
                        <CardFooter className="justify-between">
                          <div className="flex flex-col font-semibold text-lg">
                            {/* <h1 className="">
                              {product.title.length > 10
                                ? product.title.substring(0, 12) + "..."
                                : product.title}
                            </h1> */}
                            <p
                              style={{ textAlign: "start" }}
                              className=" text-medium font-light"
                            >
                              {product.brand}
                            </p>
                            <h1 style={{ textAlign: "start" }}>
                              ${product.price}{" "}
                              <span className="font-light">night</span>
                            </h1>
                          </div>
                          <div>
                            <Button
                              radius="full"
                              className="text-white bg-[#4bacf1] font-semibold"
                            >
                              Book Now
                            </Button>
                          </div>
                        </CardFooter>
                      </div>
                    </div>
                  </div>
                </Card>
              </SwiperSlide>
            </>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default RecommendTour;
