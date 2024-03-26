import { Swiper, SwiperSlide } from "swiper/react";
import React, { useState } from "react";

import "swiper/css";
import "swiper/css/pagination";

import "./slide.scss";

import { Pagination } from "swiper/modules";
import { Image, Tabs, Tab, Card, CardBody, Button, Link } from "@nextui-org/react";
import { TourIcon } from "../../assets/TourIcon";
import { HotelIcon } from "../../assets/HotelIcon";
import { CarIcon } from "../../assets/CarIcon";
import TourSearch from "./TourSearch";
import HotelSearch from "./HotelSearch";
import CarSearch from "./CarSearch";
import { SearchIcon } from "../../assets/SearchIcon";

const SlideBanner = () => {
  const [listId, setListId] = useState(1);

  let tabs = [
    { id: 1, title: "Tour", icon: <TourIcon />, card: <TourSearch /> },
    { id: 2, title: "Khách sạn", icon: <HotelIcon />, card: <HotelSearch /> },
    { id: 3, title: "Cho thuê xe", icon: <CarIcon />, card: <CarSearch /> },
  ];

  return (
    <div className="flex justify-center xl:mb-24">
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper relative z-0 hidden xl:block"
      >
        <SwiperSlide className="bg-gradient-to-r from-cyan-500 to-[#73D8FC]">
          <div className="w-5/6 flex justify-between mt-20">
            <div className="text-white font-semibold text-5xl font-sans text-start pr-6">
              <p className="pt-16 pb-4 leading-tight">
                Biết Rõ Hơn, Đặt Chỗ Tốt Hơn,<br/>Đi Tốt Hơn.
              </p>
            </div>
            <div className="">
              <Image
                className="-mt-4"
                width="500px"
                alt="NextUI hero Image with delay"
                src="./anh2.png"
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* SearchBar */}
      <div className="w-5/6 absolute z-40 mt-[396px] hidden xl:block">
        <div className="flex w-full flex-col">
          <Tabs
            size="lg"
            aria-label="Dynamic tabs"
            items={tabs}
            variant="bordered"
            radius="md"
          >
            {(item) => (
              <Tab
                className="px-0"
                key={item.id}
                title={
                  <div
                    onClick={() => setListId(item.id)}
                    className={`flex items-center space-x-2 font-semibold ${
                      listId === item.id
                        ? "text-cyan-400 px-4"
                        : "text-white px-4"
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
                  <div className="flex items-center">
                    <CardBody>{item.card}</CardBody>
                      <Button
                        as={Link}
                        href="/search"
                        isIconOnly
                        variant="ghost"
                        className="bg-gradient-to-tl text-white to-cyan-500 from-[#73D8FC] mr-4 mt-6"
                        size="lg"
                        radius="md"
                      >
                        <SearchIcon />
                      </Button>
                  </div>
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
