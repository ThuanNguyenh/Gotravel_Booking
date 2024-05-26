// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { FaHandPointRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

function AboutUsSlide() {
  return (
    <>

      <div
        style={{
          width: "100%",
          height: "375px",
          marginTop: "100px",
          position: "relative",
          borderRadius: "50px",
          backgroundColor: "#01B7F2",
          display: "flex",
          padding: "0 50px",
        }}
      >
        <div style={{ width: "50%", height: "100%" }}>
          <>
            <Swiper
              style={{
                width: "394px",
                height: "500px",
                position: "relative",
                top: "-62px",
              }}
              effect={"coverflow"}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              speed={3000}
              modules={[EffectCoverflow, Pagination, Autoplay]}
              className="mySwiper"
            >
              <SwiperSlide>
                <img
                  style={{
                    width: "394px",
                    height: "500px",
                    borderRadius: "10px",
                  }}
                  src={
                    "https://ik.imagekit.io/tvlk/blog/2022/06/dia-diem-du-lich-quy-nhon-2.jpg"
                  }
                />
              </SwiperSlide>

              <SwiperSlide>
                <img
                  style={{
                    width: "394px",
                    height: "500px",
                    borderRadius: "10px",
                  }}
                  src={
                    "https://www.vietnambooking.com/wp-content/uploads/2018/08/dulich-quang-binh-kham-pha-vuong-quoc-cua-nhung-hang-dong-ki-bi-22-8-2018-1.jpg"
                  }
                />
              </SwiperSlide>

              <SwiperSlide>
                <img
                  style={{
                    width: "394px",
                    height: "500px",
                    borderRadius: "10px",
                  }}
                  src={
                    "https://img.baoninhbinh.org.vn/DATA/ARTICLES/2022/10/6/top-10-dia-diem-du-lich-da-nang-duoc-khach-du-lich-yeu-thich-2664a.jpg"
                  }
                />
              </SwiperSlide>
            </Swiper>
          </>
        </div>
        <div
          style={{ paddingLeft: "30px", paddingTop: "20px" }}
          className="about-us"
        >
          <h1 style={{ textAlign: "center", fontSize: "20px", color: "white" , marginBottom:'10px'}}>
            Về Chúng Tôi
          </h1>
          <p style={{ color: "white" }}>
            Du lịch là một hoạt động tuyệt vời mang lại nhiều lợi ích. Nó không
            chỉ giúp chúng ta thư giãn, thoát khỏi cuộc sống thường ngày mà còn
            mở rộng tầm nhìn, hiểu biết về văn hóa và con người ở những vùng đất
            mới. Mỗi chuyến đi là một cơ hội để khám phá thiên nhiên, thưởng
            thức ẩm thực đặc trưng và học hỏi những điều mới mẻ. Du lịch còn
            giúp kết nối mọi người, xây dựng những kỷ niệm đáng nhớ và tăng
            cường tình cảm gia đình, bạn bè. Chính vì vậy, du lịch ngày càng trở
            thành một phần không thể thiếu trong cuộc sống hiện đại.
          </p>
          <div
            style={{
              marginTop: "30px",
              marginBottom: "30px",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <div style={{ marginTop: "5px", display: "flex", width: "50%" }}>
              <FaHandPointRight style={{ fontSize: "18px", color: "white" }} />
              <p style={{ color: "white", marginLeft: "7px" }}> Dịch Vụ</p>
            </div>

            <div style={{ marginTop: "5px", display: "flex", width: "50%" }}>
              <FaHandPointRight style={{ fontSize: "18px", color: "white" }} />
              <p style={{ color: "white", marginLeft: "7px" }}> Hỗ trợ 24/7</p>
            </div>

            <div style={{ marginTop: "5px", display: "flex", width: "50%" }}>
              <FaHandPointRight style={{ fontSize: "18px", color: "white" }} />
              <p style={{ color: "white", marginLeft: "7px" }}> Khuyến Mãi</p>
            </div>

            <div style={{ marginTop: "5px", display: "flex", width: "50%" }}>
              <FaHandPointRight style={{ fontSize: "18px", color: "white" }} />
              <p style={{ color: "white", marginLeft: "7px" }}>
                {" "}
                Công Ty Hợp Tác
              </p>
            </div>
          </div>

          <button className="bn">Khám Phá Ngay</button>
        </div>
      </div>
    </>
  );
}

export default AboutUsSlide;
