import {
  Card,
  CardBody,
  Button,
  Image,
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { LocationIcon } from "../../assets/LocationIcon";
import { ChevronDownIcon } from "../../assets/ChevronDownIcon ";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Empty from "../alert/Empty";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";

// LỌC THEO TRẠNG THÁI CONFIRM
const listConfirm = [
  {
    title: "Sắp diễn ra",
    confirm: "CONFIRMED",
  },
  {
    title: "Đang diễn ra",
    confirm: "IN_PROGRESS",
  },
  {
    title: "Đã hoàn thành",
    confirm: "COMPLETED",
  },
  {
    title: "Tất cả",
    confirm: "",
  },
];

function BookingHistory() {
  const navigate = useNavigate();

  // get token from localStorage
  const token = localStorage.getItem("accessToken");

  // get userId from localStorage
  const userString = localStorage.getItem("userInfo");
  const user = JSON.parse(userString);
  const userId = user?.userId;

  const [toursBooking, setToursBooking] = useState([]);

  const [confirmation, setConfirmation] = useState("");
  const [confirmTitle, setConfirmTitle] = useState("Tất cả");

  // số liệu phân trang
  const [currentPage, setCurrentPage] = useState(1); // trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // tổng số trang
  const pageSize = 10; // số lượng mục trên mỗi trang

  useEffect(() => {
    async function getToursBooking() {
      try {
        if (!token) {
          return;
        }
        const params = {};

        if (confirmation) {
          params.confirmation = confirmation;
        }

        // xây dựng URL với các tham số truy vấn
        const queryString = new URLSearchParams(params).toString();
        const URL = `http://localhost:8080/api/v1/booking/my-book/${userId}/filter?${queryString}`;

        // Thay đổi URL của trình duyệt
        navigate(`/profile?${queryString}`, { replace: true });

        // Thêm token vào tiêu đề "Authorization"
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const res = await axios.get(URL, config);

        // tính toán index bắt đầu và kết thúc của trang hiện tại
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = currentPage * pageSize - 1;

        // lấy ra chỉ mục của dữ liệu để hiển thị trên trang hiện tại
        const dataToShow = res.data?.content.slice(startIndex, endIndex + 1);

        setTotalPages(res.data?.totalPages);
        setToursBooking(dataToShow);
      } catch (error) {
        console.error(error);
      }
    }

    getToursBooking();
  }, [userId, token, confirmation, navigate, currentPage]);

  // xử lý thay đổi trang
  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // convert confirmation
  const getStatus = (status) => {
    switch (status) {
      case "CONFIRMED":
        return { text: "Sắp diễn ra", color: "warning" };
      case "IN_PROGRESS":
        return { text: "Đang diễn ra", color: "success" };
      case "COMPLETED":
        return { text: "Đã hoàn thành", color: "primary" };
      default:
        return { text: "không xác định", color: "default" };
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-10">
        <Card className="">
          <div className="px-7 py-5">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">TẤT CẢ TOUR ĐÃ ĐẶT</h2>
              <ButtonGroup variant="faded">
                <Button> {confirmTitle}</Button>
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Button isIconOnly>
                      <ChevronDownIcon />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    selectionMode="single"
                    className="max-w-[250px]"
                  >
                    {listConfirm?.map((status) => (
                      <DropdownItem
                        key={status.title}
                        onClick={() => {
                          setConfirmation(status.confirm),
                            setConfirmTitle(status.title);
                        }}
                      >
                        {status.title}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </ButtonGroup>
            </div>
            {toursBooking?.length > 0 ? (
              <>
                {toursBooking?.map((tour) => (
                  <Card
                    key={tour.tour.tourId}
                    isBlurred
                    className="border my-4 bg-background/60 dark:bg-default-100/50"
                    shadow="none"
                  >
                    <CardBody>
                      <div className="grid grid-cols-6 md:grid-cols-12 md:gap-4">
                        <div className=" col-span-3 md:col-span-3">
                          <Image
                            height={150}
                            shadow="sm"
                            src={tour.tour.thumbnail}
                            width="100%"
                          />
                        </div>

                        <div className="flex flex-col col-span-6 md:col-span-6">
                          <div className="flex flex-col justify-between gap-5">
                            <div className="flex flex-col gap-2">
                              <h3 className="font-mediium text-md">
                                {tour.tour.tourName}
                              </h3>
                              <div className="flex flex-row items-end gap-2">
                                <LocationIcon className="w-5" />
                                <p className="text-md text-slate-500 text-[#73D8FC]">
                                  {tour.tour.detailAddress}, {tour.tour.ward},
                                  {tour.tour.district}, {tour.tour.province}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-row w-fit gap-5 justify-between text-medium font-lights text-slate-500">
                              <div className="flex gap-2">
                                <h1 className="">Bắt đầu: </h1>
                                <h1 className="italic font-medium">
                                  {tour.checkInDate}
                                </h1>
                              </div>
                              <div className="flex gap-2">
                                <h1 className="">Kết thúc:</h1>
                                <h1 className="italic font-medium">
                                  {tour.checkOutDate}
                                </h1>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col col-span-3 md:col-span-3 items-end gap-3 text-right h-full  justify-between">
                          <div className="flex items-center gap-3 ">
                            <span className="text-[1.1em] text-slate-500 decoration-double underline">
                              Tổng:
                            </span>
                            <span className="font-semibold text-[1.5em] text-warning">
                              $ {tour.total}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 ">
                            <span className="text-[1.1em] text-slate-500 decoration-double underline">
                              Số khách:
                            </span>
                            <span className="font-semibold text-[1.5em]">
                              {tour.numGuest}
                            </span>
                          </div>

                          <div className="flex items-end gap-5 italic">
                            <div className={`text-${getStatus(tour.confirmation).color}`}>{getStatus(tour.confirmation).text}</div>
                            <Link to={`/tourDetail/${tour.tourId}`}>
                              <Button
                                size="sm"
                                variant="light"
                                className="bg-[#73D8FC] text-white text-sm font-medium"
                              >
                                Xem Tour
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
                <div className="flex items-center justify-center gap-3 ">
                  <Button
                    variant="faded"
                    isIconOnly
                    size="sm"
                    onClick={() => handlePageChange("prev")}
                  >
                    <MdOutlineNavigateBefore size="sm" color="grey" />
                  </Button>
                  <div className="text-lg">
                    {currentPage} / {totalPages}
                  </div>

                  <Button
                    size="sm"
                    variant="faded"
                    isIconOnly
                    onClick={() => handlePageChange("next")}
                  >
                    <MdOutlineNavigateNext size="sm" color="grey" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Empty />
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default BookingHistory;
