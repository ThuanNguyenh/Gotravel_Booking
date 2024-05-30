import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Input,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import axios from "axios";
import "./manageTour/manageTour.css";
import { useEffect, useState } from "react";
import { ChevronDownIcon } from "../../assets/ChevronDownIcon ";
import { SearchIcon } from "../../assets/SearchIcon";
import DatePicker from "react-datepicker";
import "../css/DatePicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { CiSquareRemove } from "react-icons/ci";
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

export default function ViewBookingTours() {
  const navigate = useNavigate();
  // state data
  const [dataTour, setDataTour] = useState([]);
  const [message, setMessage] = useState(null);

  // get token from localStorage
  const token = localStorage.getItem("accessToken");

  // get userId from localStorage
  const userString = localStorage.getItem("userInfo");
  const user = JSON.parse(userString);
  const userId = user?.userId;

  // THÔNG TIN FILTER
  const [keyword, setKeyword] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [confirmTitle, setConfirmTitle] = useState("Tất cả");

  // số liệu phân trang
  const [currentPage, setCurrentPage] = useState(1); // trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // tổng số trang
  const pageSize = 9; // số lượng mục trên mỗi trang
  const [totalElements, setTotalElements] = useState();
  const [sizeOfPage, setSizeOfPage] = useState();

  // // get all data booking tour

  useEffect(() => {
    async function getDataTour() {
      try {
        if (!token) {
          return;
        }

        const params = {
          sort: {
            sorted: true,
            unsorted: false,
            empty: false,
            direction: "DESC", // Sắp xếp theo thứ tự giảm dần (mới nhất đến cũ nhất)
            property: "checkInDate", // Sắp xếp theo trường checkInDate
          },
        };

        if (keyword) {
          params.keyword = keyword;
        }

        if (checkInDate) {
          params.checkInDate = checkInDate;
        }
        if (checkOutDate) {
          params.checkOutDate = checkOutDate;
        }
        if (confirmation) {
          params.confirmation = confirmation;
        }

        // xây dựng URL với các tham số truy vấn
        const queryString = new URLSearchParams(params).toString();
        const URL = `http://localhost:8080/api/v1/booking/booking-tour-date/${userId}/filter?${queryString}`;

        // Thay đổi URL của trình duyệt
        navigate(`/host?${queryString}`, { replace: true });

        // Thêm token vào tiêu đề "Authorization"
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(URL, config);

        // tính toán index bắt đầu và kết thúc của trang hiện tại
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = currentPage * pageSize - 1;

        // lấy ra chỉ mục của dữ liệu để hiển thị trên trang hiện tại
        const dataToShow = response.data?.content.slice(
          startIndex,
          endIndex + 1
        );

        setDataTour(dataToShow);
        setTotalPages(response.data?.totalPages);
        setTotalElements(response.data?.totalElements);
        setSizeOfPage(dataToShow.length);
      } catch (error) {
        setMessage(error.response.data.message);
      }
    }

    getDataTour();
  }, [
    checkInDate,
    checkOutDate,
    confirmation,
    userId,
    token,
    navigate,
    keyword,
    currentPage,
  ]);

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

  // xử lý thay đổi trang
  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (message) {
    return <div>{message}</div>;
  }

  return (
    <div className=" h-[100vh]">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%] rounded-lg"
            placeholder="Tìm theo tên tour hoặc địa điểm"
            size="sm"
            variant="faded"
            startContent={<SearchIcon />}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <div className="flex gap-3">
            {/* Lọc theo ngày bắt đầu */}
            <div className="flex items-center">
              <DatePicker
                placeholderText="Từ ngày"
                onChange={(date) => setCheckInDate(format(date, "yyyy-MM-dd"))}
                selected={checkInDate}
                className="date-picker border rounded-l-lg p-2 w-[100px] text-center"
              />
              <div
                className="border p-2 rounded-r-lg bg-gray-100"
                onClick={() => setCheckInDate(null)}
              >
                {checkInDate ? (
                  <CiSquareRemove size="1.5em" color="grey" />
                ) : (
                  <FaCalendarAlt size="1.5em" color="grey" />
                )}
              </div>
            </div>

            {/* Lọc theo ngày kết thúc */}
            <div className="flex items-center">
              <DatePicker
                placeholderText="Đến ngày"
                onChange={(date) => setCheckOutDate(format(date, "yyyy-MM-dd"))}
                selected={checkOutDate}
                className="date-picker border rounded-l-lg p-2 w-[100px] text-center"
              />
              <div
                className="border p-2 rounded-r-lg bg-gray-100"
                onClick={() => setCheckOutDate(null)}
              >
                {!checkOutDate ? (
                  <FaCalendarAlt size="1.5em" color="grey" />
                ) : (
                  <CiSquareRemove size="1.5em" color="grey" />
                )}
              </div>
            </div>

            {/* lọc theo trạng thái */}
            <div className="flex gap-3">
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button
                    endContent={<ChevronDownIcon className="text-small" />}
                    variant="faded"
                    className="rounded-lg"
                  >
                    {confirmTitle}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Table Columns"
                  disallowEmptySelection
                  selectionMode="single"
                >
                  {listConfirm?.map((status) => (
                    <DropdownItem
                      key={status.title}
                      className="capitalize"
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
            </div>
          </div>
        </div>

        {dataTour?.length > 0 ? (
          <div>
            <Table layout="fixed" aria-label="Example static collection table">
              <TableHeader>
                <TableColumn style={{ width: "350px" }}>TÊN TOUR</TableColumn>
                <TableColumn style={{ width: "150px" }}>VỊ TRÍ</TableColumn>

                <TableColumn style={{ width: "110px" }}>
                  LƯỢNG KHÁCH
                </TableColumn>
                <TableColumn style={{ width: "100px" }}>KHÁCH ĐẶT</TableColumn>
                <TableColumn style={{ width: "150px" }}>
                  NGÀY BẮT ĐẦU
                </TableColumn>
                <TableColumn style={{ width: "150px" }}>
                  NGÀY KẾT THÚC
                </TableColumn>
                <TableColumn style={{ width: "150px" }}>$ TỔNG THU</TableColumn>
                <TableColumn style={{ width: "150px" }}>TRẠNG THÁI</TableColumn>
              </TableHeader>
              <TableBody>
                {/* Map over the currentTours to render each row dynamically */}
                {dataTour?.map((tour) => (
                  <TableRow key={tour}>
                    <TableCell>{tour.tourName}</TableCell>
                    <TableCell>
                      {/* <Chip className="capitalize" size="sm" variant="flat"> */}
                      {tour.province}
                      {/* </Chip> */}
                    </TableCell>

                    <TableCell>{tour.numGuest}</TableCell>

                    <TableCell>{tour.numGuestBooked}</TableCell>

                    <TableCell>
                      {/* <Chip className="capitalize" size="sm" variant="flat"> */}
                      {tour.checkInDate}
                      {/* </Chip> */}
                    </TableCell>
                    <TableCell>{tour.checkOutDate}</TableCell>

                    <TableCell>{tour.totalPriceBooked}</TableCell>

                    <TableCell>
                      <Chip
                        className="capitalize"
                        size="small"
                        variant="dot"
                        color={getStatus(tour.confirmation).color}
                      >
                        {getStatus(tour.confirmation).text}
                      </Chip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center p-4">KHÔNG CÓ DỮ LIỆU</div>
        )}

        {/* Thanh điều hướng phân trang */}
        <div className="flex items-center justify-between">
          <div className="text-lg flex gap-20">
            <span className="font-semibold">
              Tổng: <span className="font-medium italic">{totalElements}</span>
            </span>
            <span className="font-semibold">
              Hiện tại: <span className="font-medium italic">{sizeOfPage}</span>
            </span>
          </div>
          <div className="flex items-center gap-3 ">
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
        </div>
      </div>
    </div>
  );
}
