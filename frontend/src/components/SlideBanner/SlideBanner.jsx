import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import "./slide.scss";

import { Pagination } from "swiper/modules";
import { Image, Card, CardBody } from "@nextui-org/react";

import TourSearch from "./TourSearch";

const SlideBanner = () => {
  return (
    <div className="flex justify-center xl:mb-[80px]">
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper relative z-0 hidden xl:block"
      >
        <SwiperSlide className="bg-gradient-to-r from-cyan-500 to-[#73D8FC]">
          <div className="w-5/6 flex justify-between mt-10">
            <div className="text-white font-semibold text-5xl font-sans text-start pr-6">
              <p className="pt-32 pb-4 leading-tight">
                Biết Rõ Hơn, Đặt Chỗ Tốt Hơn,
                <br />
                Đi Tốt Hơn.
              </p>
            </div>
            <div className="">
              <Image
                className="p-4"
                width="500px"
                alt="NextUI hero Image with delay"
                src="./anh2.png"
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* SearchBar */}
      <div className="w-5/6 absolute z-40 mt-[480px] hidden xl:block">
        <div className="flex w-full flex-col">
          <Card>
            <div className="flex items-center">
              <CardBody>
                <TourSearch />
              </CardBody>
            </div>
          </Card>
        </div>
      </div>
      {/* SearchBar */}
    </div>
  );
};

export default SlideBanner;
