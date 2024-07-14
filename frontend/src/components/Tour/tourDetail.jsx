/* eslint-disable no-unused-vars */
import {
  Button,
  Image,
  Tabs,
  Tab,
  Modal,
  useDisclosure,
  ModalFooter,
  ModalHeader,
  ModalBody,
  ModalContent,
} from "@nextui-org/react";
import { HeartIcon } from "../../assets/heart";
import { ShareIcon } from "../../assets/Share";
import TourDetailDes from "./tourDetailDes";
import TourDetailReview from "./tourDetailReview";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ScrollToTopButton from "../alert/ScrollToTopButton";
import { TiLocation } from "react-icons/ti";
import { HiMiniCheckBadge } from "react-icons/hi2";
import Slider from "react-slick";
import { PiDotsNine } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";

function TourDetail() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  //heart button
  const [liked, setLiked] = useState(false);

  //fetch tour detail based id
  const { tourId } = useParams();
  const [dataTour, setDataTour] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const [nextTourId, setNextTourId] = useState(null);

  // get data tour
  const getDataTour = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/tour/${tourId}`
      );
      setDataTour(response.data);
      console.log("chi tiet tour: ", response.data);
    } catch (error) {
      console.log("Error");
    }
  };

  useEffect(() => {
    getDataTour();
  }, []);

  // Function to handle the selection of a tour
  const handleSelectTour = (tourId) => {
    setNextTourId(tourId);
    getDataTour(tourId);
  };

  const [showAll, setShowAll] = useState(false);

  const handleShowAllSlick = () => {
    setShowAll(true);
  };

  const imagesToShow = showAll
    ? dataTour?.images
    : dataTour?.images?.slice(0, 4);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col md:flex-row justify-between pt-5 gap-5">
        {/* left */}
        <div className="flex flex-col gap-3">
          <p className="text-[24px] font-semibold">{dataTour?.tourName}</p>
          <div className="flex flex-row gap-2">
            <TiLocation color="#73D8FC" size={24} />

            <div>
              {dataTour.detailAddress}, {dataTour.ward}, {dataTour.district},{" "}
              {dataTour.province}
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <HiMiniCheckBadge color="#73D8FC" size={24} />
            <p>
              <span className="italic underline">100</span> lượt tham quan
            </p>
          </div>
        </div>

        {/* right */}

        <div className="flex flex-col gap-5 md:items-end justify-between">
          <h1 className="text-[24px] font-semibold flex gap-2 items-center">
            <span className="text-[18px]">$</span>
            {dataTour.priceAdult}{" "}
          </h1>
          <div className="flex flex-row gap-3">
            <Button
              isIconOnly
              variant="bordered"
              className="border-[#73D8FC]"
              onPress={() => setLiked((v) => !v)}
            >
              <HeartIcon
                className={liked ? "[&>path]:stroke-transparent" : ""}
                fill={liked ? "red" : "none"}
              />
            </Button>
            <Button isIconOnly variant="bordered" className="border-[#73D8FC]">
              <ShareIcon />
            </Button>
            <Link to={`/checkout/${dataTour.tourId}`}>
              <Button
                disabled={dataTour?.status === false ? true : false}
                variant="flat"
                className={`${
                  dataTour.status === true
                    ? "bg-[#73D8FC] text-white"
                    : "text-[#4682B4]"
                }   font-medium text-[1em] shadow-inner`}
              >
                {/* {dataTour.status === true ? "Đặt chỗ" : "Không hoạt động"} */}
                Đặt tour
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="block md:hidden">
        <Slider {...settings}>
          {dataTour?.images &&
            dataTour?.images.map((image, index) => (
              <div key={index}>
                <Image
                  width="100%"
                  className="h-48 w-full object-cover object-center"
                  src={image.url}
                />
              </div>
            ))}
        </Slider>
      </div>

      <div className="hidden md:block">
        <div className="grid grid-cols-2 gap-3">
          <Image
            isBlurred
            className="h-full w-full object-cover object-center aspect-[16/9]"
            src={dataTour?.thumbnail}
          />
          <div className="grid grid-cols-2 gap-2">
            {imagesToShow?.map((image, index) => (
              <div key={index} className="relative">
                <Image
                  isBlurred
                  className="w-80 h-48 relative z-0"
                  src={image.url}
                />
                {index === 3 && dataTour?.images?.length > 4 && (
                  <Button
                    onPress={onOpen}
                    color="white"
                    variant="faded"
                    className="absolute bottom-5 right-5 flex items-center justify-center bg-white text-[#333333]"
                  >
                    <PiDotsNine size={24} /> Xem tất cả ảnh
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* show all images */}
      <div>
        <Modal
          hideCloseButton
          size="full"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex items-center place-content-center gap-1 border-b">
                  <Button
                    isIconOnly
                    variant="bordered"
                    onPress={onClose}
                    size="sm"
                    className="left-10 absolute"
                  >
                    <IoIosArrowBack size={18} color="grey" />
                  </Button>
                  <div className="font-medium">Tất cả hình ảnh của Tour</div>
                </ModalHeader>
                <ModalBody className="overflow-auto custom-scrollbar w-full place-content-center grid">
                  <div className="grid grid-cols-3 gap-3 p-80">
                    {dataTour?.images?.map((image, index) => (
                      <Image
                        key={index}
                        isBlurred
                        className="w-auto h-auto object-cover"
                        src={image.url}
                        radius="none"
                      />
                    ))}
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>

      <div>
        <Tabs size="lg" variant="underlined" color="primary">
          <Tab title="Giới thiệu">
            <TourDetailDes />
          </Tab>
          <Tab title="Đánh giá">
            <TourDetailReview />
          </Tab>
        </Tabs>

        <div className="w-full h-80 flex flex-col gap-4">
          <div className="text-xl font-semibold">Vị trí</div>
          <div className="relative w-full h-full">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13594.86430887069!2d77.3405611!3d31.5868329!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3905af6c857711cf%3A0x443ba8a6671fa200!2sWhispering%20Pines%20Cottages%2C%20Tandi!5e0!3m2!1svi!2s!4v1706603462304!5m2!1svi!2s"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <ScrollToTopButton />
    </div>
  );
}

export default TourDetail;
