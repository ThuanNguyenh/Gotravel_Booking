import { useEffect, useState } from "react";

import { MdOutlineTour } from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";
import { MdAutorenew, MdUpcoming } from "react-icons/md";

import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

import "./dashBoard.css";
import axios from "axios";
import "../css/DatePicker.css";
import { Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

export default function DashBoard() {
  // get userId from localStorage
  const userString = localStorage.getItem("userInfo");
  const user = JSON.parse(userString);
  const userId = user?.userId;

  // const [dataBooking, setDataBooking] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);

  // doanh thu
  const [monthrevenue, setMonthRevenue] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format("YYYY-MM")); // Default to current month

  // count tour
  const [countTour, setCountTour] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  // lấy tất cả booking
  useEffect(() => {
    async function getDataBooking() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/booking/booking-tour-date/${userId}`
        );

        const allBookings = response?.data;

        // Lọc các booking có trạng thái confirmation là COMPLETED
        const completedBookings = allBookings.filter(
          (booking) => booking.confirmation === "COMPLETED"
        );

        setCompletedBookings(completedBookings);
      } catch (error) {
        console.error(error.response.data?.message);
      }
    }

    getDataBooking();
  }, [userId]);

  // SỐ LƯỢNG TOUR CỦA USER
  useEffect(() => {
    async function getCountTour() {
      const resCount = await axios.get(
        `http://localhost:8080/api/v1/tour/count/${userId}`
      );

      setCountTour(resCount.data);
    }

    getCountTour();
  }, [userId]);

  const [countUpcoming, setCountUpcoming] = useState(0);
  const [countInProgress, setCountInProgress] = useState(0);

  // SỐ LƯƠNG TOUR SẮP DIỄN RA
  useEffect(() => {
    async function getCountTourUpcoming() {
      const res = await axios.get(
        `http://localhost:8080/api/v1/booking/count-tour-confirm/${userId}&CONFIRMED`
      );
      setCountUpcoming(res.data);
    }
    getCountTourUpcoming();
  }, [userId]);

  // SỐ LƯỢNG TOUR ĐANG DIỄN RA
  useEffect(() => {
    async function getCountTourInProgress() {
      const res = await axios.get(
        `http://localhost:8080/api/v1/booking/count-tour-confirm/${userId}&IN_PROGRESS`
      );
      setCountInProgress(res.data);
    }
    getCountTourInProgress();
  }, [userId]);

  // doanh thu - lượt hoàn thành
  useEffect(() => {
    // Hàm kiểm tra xem ngày có thuộc tháng cụ thể không
    function isSameMonth(dateString, monthString) {
      const date = dayjs(dateString);
      const month = dayjs(monthString);
      return date.isSame(month, "month");
    }

    // Lọc các booking theo tháng đã chọn
    const monthlyCompletedBookings = completedBookings.filter((booking) =>
      isSameMonth(booking.checkInDate, selectedMonth)
    );

    // Tính tổng doanh thu của tháng đã chọn
    const monthTotal = monthlyCompletedBookings.reduce((sum, booking) => {
      return sum + booking.totalPriceBooked;
    }, 0);

    setMonthRevenue(monthTotal);

    // đếm số lượt hoàn thành của tháng đã chọn
    setCompletedCount(monthlyCompletedBookings.length);
  }, [completedBookings, selectedMonth]);

  return (
    <div className="text-[1.3em]">
      <div className="grid grid-cols-3 gap-4 place-items-stretch h-36">
        {/* doanh thu */}
        <div className="shadow flex flex-col gap-3 border rounded-lg p-3 ">
          <div className="flex justify-between items-start">
            <span className="font-bold">Doanh thu tháng</span>
            <div className="flex items-center">
              <DatePicker
                placeholderText="Chọn tháng"
                onChange={(date) => setSelectedMonth(date)}
                selected={selectedMonth}
                className="date-picker border rounded-l-lg p-2 w-[100px] text-center h-[35px]"
                showMonthYearPicker
                dateFormat="MM/yyyy"
              />

              <div className="border h-[35px] p-2 rounded-r-lg bg-gray-100">
                <FaCalendarAlt size="1em" color="grey" />
              </div>
            </div>
          </div>
          <div className="flex gap-3 items-center font-bold">
            <BsCurrencyDollar color="#00FA9A" size="1.3em" />{" "}
            <span className="text-2xl text-[#00FA9A]">
              {monthrevenue.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span>
              <FaArrowTrendUp color="green" />
            </span>

            <span>5 % so với tháng trước</span>

            <span>
              <FaArrowTrendDown color="red" />
            </span>
          </div>
        </div>

        {/* lượt hoàn thành */}
        <div className="shadow flex flex-col gap-3 border rounded-lg p-3 ">
          <div className="flex justify-between items-end">
            <span className="font-bold">Lượt hoàn thành</span>
            {/* <div className="flex items-center">
              <DatePicker
                placeholderText="Chọn tháng"
                onChange={(date) => setSelectedMonth(date)}
                selected={selectedMonth}
                className="date-picker border rounded-l-lg p-2 w-[100px] text-center h-[35px]"
                showMonthYearPicker
                dateFormat="MM/yyyy"
              />

              <div className="border h-[35px] p-2 rounded-r-lg bg-gray-100">
                <FaCalendarAlt size="1em" color="grey" />
              </div>
            </div> */}
          </div>
          <div className="flex gap-3 items-center font-bold">
            <IoCheckmarkDoneSharp color="#DAA520" size="1.3em" />{" "}
            <span className="text-2xl text-[#DAA520]">{completedCount}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>
              <FaArrowTrendUp color="green" />
            </span>

            <span>5 % so với tháng trước</span>

            <span>
              <FaArrowTrendDown color="red" />
            </span>
          </div>
        </div>

        {/* Tổng số lượng tour */}
        <div className="shadow flex flex-col gap-3 border rounded-lg p-3 ">
          <div className="flex justify-between items-end">
            <span className="font-bold">Số lượng tour</span>
          </div>
          <div className="flex gap-3 items-center font-bold">
            <MdOutlineTour color="#4682B4" size="1.3em" />{" "}
            <span className="text-2xl text-[#4682B4]">{countTour}</span>
          </div>
          <div className="flex justify-between items-center gap-3">
            <div className="flex items-center gap-2">
              <span>
                <MdUpcoming color="#DAA520" />
              </span>

              <span>Sắp diễn ra {countUpcoming}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>
                <MdAutorenew color="green" />
              </span>
              <span>Đang diễn ra {countInProgress}</span>
            </div>
          </div>
        </div>
      </div>

      {/* thống kê doanh thu của tất cả tour theo tháng */}
      <div className="mt-4 flex flex-col gap-4">
        <div className="font-bold">Bảng chi tiết doanh thu tour theo tháng</div>
        <div>
          <Table layout="fixed" aria-label="Example static collection table">
            <TableHeader>
              <TableColumn style={{ width: "350px" }}>TÊN TOUR</TableColumn>
              <TableColumn style={{ width: "150px" }}>VỊ TRÍ</TableColumn>

              <TableColumn style={{ width: "110px" }}>LƯỢNG KHÁCH</TableColumn>
              <TableColumn style={{ width: "100px" }}>KHÁCH ĐẶT</TableColumn>
              <TableColumn style={{ width: "150px" }}>NGÀY BẮT ĐẦU</TableColumn>
              <TableColumn style={{ width: "150px" }}>
                NGÀY KẾT THÚC
              </TableColumn>
              <TableColumn style={{ width: "150px" }}>$ TỔNG THU</TableColumn>
              <TableColumn style={{ width: "150px" }}>TRẠNG THÁI</TableColumn>
            </TableHeader>
            <TableBody>
              {/* Map over the currentTours to render each row dynamically */}
              {completedBookings?.map((tour) => (
                <TableRow key={tour.tourId}>
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
                      // color={getStatus(tour.confirmation).color}
                    >
                      {/* {getStatus(tour.confirmation).text} */}
                    </Chip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
