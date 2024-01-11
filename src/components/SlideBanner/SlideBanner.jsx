import { Swiper, SwiperSlide } from "swiper/react";
import React, { useState } from "react";

import "swiper/css";
import "swiper/css/pagination";

import "./slide.scss";

import { Pagination } from "swiper/modules";
import { Image, Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { TourIcon } from "../../assets/TourIcon";
import { HotelIcon } from "../../assets/HotelIcon";
import { CarIcon } from "../../assets/CarIcon";
import TourSearch from "./TourSearch";
import HotelSearch from "./HotelSearch";
import CarSearch from "./CarSearch";

const SlideBanner = () => {
  const [listId, setListId] = useState(1);

  let tabs = [
    { id: 1, title: "Tour", icon: <TourIcon />, card: <TourSearch /> },
    { id: 2, title: "Khách sạn", icon: <HotelIcon />, card: <HotelSearch /> },
    { id: 3, title: "Cho thuê xe", icon: <CarIcon />, card: <CarSearch /> },
  ];

  return (
    <div className="flex justify-center xl:mb-32">
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper relative z-0 hidden xl:block"
      >
        <SwiperSlide className="bg-gradient-to-r from-cyan-500 to-blue-500">
          <div className="w-5/6 flex justify-between mt-20">
            <div className="text-white font-semibold text-5xl font-sans text-start pr-6">
              <p className="pt-16 pb-4 leading-tight">
                Biết Rõ Hơn, Đặt Chỗ Tốt Hơn, Đi Tốt Hơn.
              </p>
            </div>
            <div className="">
              <Image
                className=""
                width="500px"
                alt="NextUI hero Image with delay"
                src="./anh2.png"
              />
            </div>
          </div>
        </SwiperSlide>
        {/* <SwiperSlide>
          <img
            alt="NextUI hero Image"
            // src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            
            alt="NextUI hero Image"
            // src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
          />
        </SwiperSlide> */}
      </Swiper>

      {/* SearchBar */}
      <div className="w-5/6 absolute z-40 mt-96 hidden xl:block">
        <div className="flex w-full flex-col">
          <Tabs size="lg" aria-label="Dynamic tabs" items={tabs} variant="bordered">
            {(item) => (
              <Tab
                className="px-0"
                key={item.id}
                title={
                  <div
                    onClick={() => setListId(item.id)}
                    className={`flex items-center space-x-2 font-semibold ${
                      listId === item.id ? "text-cyan-400 px-4" : "text-white px-4"
                    }`}
                  >
                    {React.cloneElement(item.icon, {
                      fill: listId === item.id ? "rgb(34 211 238)" : "white",
                    })}
                    <span> {item.title}</span>
                  </div>
                }
              >
                <Card>
                  <CardBody>{item.card}</CardBody>
                </Card>
              </Tab>
            )}
          </Tabs>
        </div>
      </div>
      {/* SearchBar */}
    </div>
  );
};

export default SlideBanner;
