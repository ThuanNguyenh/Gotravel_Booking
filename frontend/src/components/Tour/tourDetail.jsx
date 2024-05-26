/* eslint-disable no-unused-vars */

import { Button, Image, Tabs, Tab, Card, CardBody, CardFooter } from "@nextui-org/react";
import { LocationIcon } from "../../assets/LocationIcon";
import { HeartIcon } from "../../assets/heart";
import { ShareIcon } from "../../assets/Share";
import TourDetailDes from "./tourDetailDes";
import TourDetailReview from "./tourDetailReview";

import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";

function TourDetail() {

  //heart button
  const [liked, setLiked] = useState(false);

  //fetch tour detail based id
  const { tourId } = useParams();
  const [dataTour, setDataTour] = useState([]);
  const [recommend, setRecommend] = useState([]);

  const [nextTourId, setNextTourId] = useState(null);
  // Function to handle the selection of a tour
  const handleSelectTour = (tourId) => {
    setNextTourId(tourId);
  };


  // get data tour
  const getDataTour = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/tour/${tourId}`
      );
      setDataTour(response.data);
      console.log("chi tiet tour: ", response.data);
    } catch (error) {
      console.log("Error")
    }
  };

  useEffect(() => {
    getDataTour();
  }, []);

    //recommend
    const getRecommend = async (tourName) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/recommend?tourName=${encodeURIComponent(tourName)}`
      );
      setRecommend(response.data);
      console.log("recommend: ", response.data);
    } catch (error) {
      console.log("Error")
    }
  };
  
  useEffect(() => {
    if (dataTour.tourName) {
      getRecommend(dataTour.tourName);
    }
  }, [dataTour]);

  return(
      <div className="flex flex-col gap-10">
          <div className="flex flex-row justify-between pt-10">
              <div className="flex flex-col gap-2">
                  <h1 className="text-3xl font-bold pb-5">{dataTour.tourName}</h1>
                  <div className="flex flex-row font-semibold"><LocationIcon/>{dataTour.detailAddress}, {dataTour.ward}, {dataTour.district}, {dataTour.province}</div>
                  <div className="flex flex-row gap-1 items-center">
                      <p className="rounded-md bg-[#01B7F2] p-1 text-white font-semibold">{dataTour.discount}</p>
                      <p className="font-semibold">Rất tốt</p>
                      <p className="underline">100 đánh giá</p>
                  </div>
              </div>

              <div className="flex flex-col gap-5 items-end justify-between">
                  <h1 className="text-3xl font-bold">${dataTour.price}/ngày</h1>
                  <div className="flex flex-row gap-3">
                      <Button isIconOnly variant="bordered" className="border-[#01B7F2]" onPress={() => setLiked((v) => !v)}>
                          <HeartIcon className={
                              liked ? "[&>path]:stroke-transparent" : ""
                            }
                            fill={liked ? "red" : "none"}/>
                      </Button>
                      <Button isIconOnly variant="bordered" className="border-[#01B7F2]"><ShareIcon/></Button>
                      <Link to={`/checkout/${dataTour.tourId}`}>
                          <Button className="bg-[#01B7F2] text-white font-semibold">Đặt chỗ ngay</Button>
                      </Link>
                  </div>
              </div>

          </div>
          <div className="">
              <div className="grid grid-cols-2">
                    <Image isBlurred className="h-full w-full px-2" src={dataTour.thumbnail}/>
                    <div className="grid grid-cols-2 gap-2">
                      {dataTour.images && dataTour.images.map((image, index) => (
                          <Image key={index} isBlurred className="w-80 h-48" src={image.url}/>
                      ))}

                    </div>
              </div>
          </div>
          <div>
              <Tabs size="lg" variant="underlined" color="primary">
                  <Tab title="Giới thiệu">
                      <TourDetailDes/>
                  </Tab>
                  <Tab  title="Đánh giá">
                      <TourDetailReview/>
                  </Tab>
              </Tabs>
          </div>
          <div>
              <div className="text-xl font-semibold pb-5">
                  Vị trí / Map
              </div>
              <div className="flex w-full justify-center">
                  <iframe
                      className=" flex w-4/5 h-96"
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13594.86430887069!2d77.3405611!3d31.5868329!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3905af6c857711cf%3A0x443ba8a6671fa200!2sWhispering%20Pines%20Cottages%2C%20Tandi!5e0!3m2!1svi!2s!4v1706603462304!5m2!1svi!2s"
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                  />
              </div>
          </div>
          <div>
          <div>
            <div className="text-xl font-semibold pb-5">Có thể bạn thích ?</div>
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-4">
                {recommend && Array.isArray(recommend.recommendations) ? (
                    recommend.recommendations.slice(0,4).map((recommendTour, index) => (
                        <Card key={index} className="border-small border-blue-400">
                            <div className="flip-card">
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                <CardBody className="p-0">
                                    <div className="relative group">
                                    <Link to={`/tourDetail/${recommendTour.tourId}`}  onClick={() => handleSelectTour(recommendTour.tourId)}>
                                        <Image
                                        isZoomed
                                        shadow="sm"
                                        radius="lg"
                                        width="100%"
                                        className="w-full object-cover h-[400px]"
                                        src={recommendTour.thumbnail}
                                        />
                                    </Link>

                                    {/* footer */}
                                    <div className="z-10 absolute bottom-0 w-full text-white p-2 flex justify-between bg-gradient-to-t from-[#4bacf1] to-transparent">
                                        <div className="relative flex gap-1">
                                        <CardFooter className="justify-center">
                                            <div className="flex flex-col font-semibold text-lg">
                                                {recommendTour.tourName.length > 10 ? recommendTour.tourName.substring(0, 20) + "..." : recommendTour.tourName}
                                            </div>
                                        </CardFooter>
                                        </div>
                                    </div>
                                    </div>
                                </CardBody>
                                </div>
                            </div>
                            </div>
                        </Card>
                    ))
                ) : (
                    <p>No recommendations available</p>
                )}
            </div>
            </div>
        </div>
      </div>
  )

}

export default TourDetail;