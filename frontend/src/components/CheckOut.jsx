import { Button, Card, CardBody, Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert } from "./Alert/Alert";
import { ClockIcon } from "@heroicons/react/24/solid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, isSameDay } from "date-fns";
import { FaCalendarAlt } from "react-icons/fa";
import styled from "styled-components";
import { TiLocation } from "react-icons/ti";

const DatePickerWrapper = styled.div`
  display: flex;
  align-items: center;

  .custom-datepicker input {
    outline: none;
    border: none;
  }

  .custom-datepicker:focus {
    outline: none;
    box-shadow: none;
  }
`;

function CheckOut() {
  const { tourId } = useParams();
  const [dataTour, setDataTour] = useState([]);
  const navigate = useNavigate();

  // get token from localStorage
  const token = localStorage.getItem("accessToken");

  // get userId from localStorage
  const userString = localStorage.getItem("userInfo");
  const user = JSON.parse(userString);
  const userId = user?.userId;

  const currency = "USD";
  const method = "SALE";
  const intent = "PAYPAL";

  const [dateBooked, setDateBooked] = useState([]);

  // get all tour
  const getBookingDateTour = async () => {
    try {
      if (!token) {
        return;
      }

      // Thêm token vào tiêu đề "Authorization"
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `http://localhost:8080/api/v1/booking/booking-tour-date/${userId}`,
        config
      );

      // lọc các booking của tour có số lượng khách đầy
      const bookings = response.data?.filter(
        (booking) =>
          booking.tourId === tourId &&
          booking.numGuestBooked === dataTour.numGuest
      );

      // lấy ngày bắt đầu đã đặt đầy
      setDateBooked(bookings.map((booking) => booking.checkInDate));
    } catch (error) {
      console.log(error);
      // setMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    getBookingDateTour();
  }, [dataTour, token, userId, tourId]);

  // get data tour
  const getDataTour = async () => {
    try {
      if (!token) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `http://localhost:8080/api/v1/tour/${tourId}`,
        config
      );
      setDataTour(response?.data);
    } catch (error) {
      console.log("Error");
    }
  };

  useEffect(() => {
    getDataTour();
  }, []);

  // Select number of customer
  const [adult, setAdult] = useState(0);
  const pricePerAdult = dataTour?.priceAdult;

  const incrementNumberA = () => {
    if (adult + children < dataTour?.numGuest) {
      setAdult((prevNumber) => prevNumber + 1);
    }
  };

  const decrementNumberA = () => {
    if (adult > 0) {
      setAdult((prevNumber) => prevNumber - 1);
    }
  };

  const [children, setChildren] = useState(0);
  const pricePerChildren = dataTour?.priceChildren;

  const incrementNumberC = () => {
    if (adult + children < dataTour?.numGuest) {
      setChildren((prevNumber) => prevNumber + 1);
    }
  };

  const decrementNumberC = () => {
    if (children > 0) {
      setChildren((prevNumber) => prevNumber - 1);
    }
  };

  const sumGuest = adult + children;
  const price = adult * pricePerAdult + children * pricePerChildren;
  const priceto = isNaN(price) ? 0 : price.toFixed(2);

  // Kiểm tra và tính toán giảm giá
  const discount = dataTour && dataTour.discount ? dataTour.discount / 100 : 0;

  // Kiểm tra giá trị discountOut
  const discountOut = isNaN(discount * price)
    ? 0
    : (discount * price).toFixed(2);

  // Kiểm tra giá trị totalPrice
  const totalPriceValue = price - discountOut;
  const totalPrice = isNaN(totalPriceValue) ? 0 : totalPriceValue.toFixed(2);

  // thông tin booking
  const [dataBooking, setDataBooking] = useState({
    numGuest: "",
    total: "",
    user: {
      userId: "",
    },
    tour: {
      tourId: "",
    },
    currency: "",
    method: "",
    intent: "",
    checkInDate: "",
    checkOutDate: "",
  });

  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const tourTime = dataTour?.tourTime;

  // hàm tính checkout
  const calculateCheckOut = (checkIn, tourTime) => {
    const checkInObj = new Date(checkIn);
    checkInObj.setDate(checkInObj.getDate() + tourTime);
    return checkInObj.toISOString().split("T")[0]; // Định dạng lại thành chuỗi yyyy-mm-dd
  };

  // tính checkout khi checkin thay đổi
  useEffect(() => {
    if (checkIn) {
      const newCheckOut = calculateCheckOut(checkIn, tourTime);
      setCheckOut(newCheckOut);
    }
  }, [checkIn, tourTime]);

  useEffect(() => {
    setDataBooking((prevData) => ({
      ...prevData,
      numGuest: adult + children,
      total: totalPrice,
      user: {
        userId: userId,
      },

      tour: {
        tourId: tourId,
      },
      currency: currency,
      method: method,
      intent: intent,
      checkInDate: checkIn,
      checkOutDate: checkOut,
    }));

    const urlParams = new URLSearchParams({
      tourId: tourId,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      numGuest: adult + children,
      total: totalPrice,
    });

    navigate({
      pathname: `/checkout/${tourId}`,
      search: `?${urlParams.toString()}`,
    });
  }, [
    adult,
    children,
    totalPrice,
    userId,
    tourId,
    currency,
    method,
    intent,
    navigate,
    checkIn,
    checkOut,
  ]);

  // BOOKING
  const handleBooking = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/booking/create`,
        dataBooking
      );

      Alert(
        2000,
        "Đặt phòng",
        "Đặt phòng thành công đang chuyển hướng đến thanh toán.",
        "success"
      );

      if (response && response?.data?.approvalUrl) {
        window.location.href = response?.data?.approvalUrl;
      } else {
        Alert(2000, "Đặt phòng", "Không tìm thấy approvalUrl.", "error");
      }
    } catch (error) {
      let errorMessage = "Đặt phòng không thành công, vui lòng thử lại.";

      if (error?.response) {
        // eslint-disable-next-line no-unused-vars
        errorMessage = error.response.data?.message || errorMessage;
      }

      Alert(2000, "Đặt phòng", errorMessage, "error");
    }
  };

  // Hàm để lấy ngày hiện tại ở định dạng yyyy-mm-dd
  const getCurrentDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Thêm 1 ngày để lấy ngày hôm sau
    return today;
  };

  const isDateBooked = (date) => {
    return dateBooked.some((bookedDate) => isSameDay(date, bookedDate));
  };

  return (
    <div className="grid grid-cols-6 md:grid-cols-12 md:gap-4 p-[3%]">
      {/* Detail Tour & Selection */}
      <div className="flex flex-col col-span-9 md:col-span-9">
        <div className="border rounded-md">
          <Card className="border-none shadow-none rounded-t-md rounded-b-none">
            <CardBody>
              <div className="grid grid-cols-6 md:grid-cols-12 md:gap-4 items-center justify-center">
                <div className="relative col-span-6 md:col-span-3 items-start h-full mt-5">
                  <Image
                    style={{ height: "150px" }}
                    shadow="sm"
                    className="rounded-md border-none"
                    src={dataTour.thumbnail}
                    width="100%"
                  />
                </div>

                <div className="flex flex-col col-span-6 md:col-span-6">
                  <div className="flex flex-col justify-between gap-3">
                    <div className="flex flex-col gap-0">
                      <h3 className="font-semibold text-xl text-[#333333]">
                        {/* {dataTour?.tourName.length > 50
                          ? dataTour?.tourName.subsString(0, 60) + "..."
                          : dataTour?.tourName} */}
                        {dataTour?.tourName}
                      </h3>
                      <div className="flex flex-row items-center gap-2 pt-2">
                        <TiLocation size={24} color="#73D8FC" />
                        <p className="text-[#333333]">
                          {dataTour.detailAddress}, {dataTour.ward},{" "}
                          {dataTour.district}, {dataTour.province}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col w-fit justify-between text-medium font-lights text-slate">
                      <div className="flex gap-3">
                        <ClockIcon className="w-5" color="#73D8FC" />
                        <h1 className="text-[#333333]">
                          Thời gian tour | {dataTour?.tourTime} ngày
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
          <div className="p-4 flex flex-col gap-4 text-md text-[#333333]">
            <div>Lượng khách tối đa {dataTour?.numGuest}</div>

            <div className="flex flex-col md:flex-row items-center gap-3">
              <span>Ngày bắt đầu </span>

              <DatePickerWrapper className="border rounded-md h-7 bg-white px-4 py-2">
                <DatePicker
                  selected={checkIn}
                  onChange={(date) => setCheckIn(format(date, "yyyy-MM-dd"))}
                  minDate={getCurrentDate()}
                  filterDate={(date) => !isDateBooked(date)}
                  placeholderText="chọn ngày"
                  dateFormat="yyyy-MM-dd"
                  className="custom-datepicker text-sm"
                />
                <FaCalendarAlt color="gray" />
              </DatePickerWrapper>
            </div>

            <div className="flex gap-4 items-center justify-between">
              <div className="flex flex-col gap-1">
                <span>Người lớn</span>
                <span className="text-cyan-500">
                  $ {dataTour?.priceAdult || 0}
                </span>
              </div>
              <div className="flex items-center">
                <Button
                  size="sm"
                  className="rounded-l-md rounded-r-none"
                  onClick={decrementNumberA}
                  isIconOnly
                >
                  -
                </Button>
                <Button
                  size="sm"
                  className="font-semibold bg-white border text-md rounded-none"
                >
                  {adult}
                </Button>
                <Button
                  size="sm"
                  className="rounded-r-md rounded-l-none"
                  onClick={incrementNumberA}
                  isIconOnly
                >
                  +
                </Button>
              </div>
            </div>

            <div className="flex gap-11 justify-between">
              <div className="flex flex-col gap-1">
                <span>Trẻ em</span>
                <span className="text-cyan-500">
                  $ {dataTour?.priceChildren || 0}
                </span>
              </div>
              <div className="flex items-center">
                <Button
                  size="sm"
                  className="rounded-l-md rounded-r-none"
                  onClick={decrementNumberC}
                  isIconOnly
                >
                  -
                </Button>
                <Button
                  size="sm"
                  className="font-semibold bg-white border text-md rounded-none"
                >
                  {children}
                </Button>
                <Button
                  size="sm"
                  className="rounded-r-md rounded-l-none"
                  onClick={incrementNumberC}
                  isIconOnly
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price BreakUp */}
      <div className="col-span-6 md:col-span-3 ">
        <div className="border rounded-lg p-2">
          <div className="flex flex-col justify-start items-start">
            <div className="text-[#333333] text-xl font-medium">Thanh toán</div>

            <div className="py-2.5 border-b border-gray-300 w-full flex justify-between">
              <div className="text-md text-[#333333]">Giá gốc</div>
              <div className="font-semibold flex gap-2 items-center">
                <span className="text-slate-400 font-normal text-sm">$</span>
                {priceto}{" "}
              </div>
            </div>

            <div className="py-2.5 border-b border-gray-300 w-full flex justify-between">
              <div className="text-md text-blue-500">Khuyến mãi</div>
              <div className="font-semibold flex gap-2 items-center">
                <span className="text-slate-400 font-normal  text-sm">$</span>
                {discountOut}{" "}
              </div>
            </div>

            <div className="py-2.5 w-full flex items-center justify-between">
              <div className="text-md font-medium text-[#333333]">
                Thành tiền
              </div>
              <div className="font-semibold flex  gap-2 items-center">
                <span className="text-slate-400 font-normal text-sm">
                  $
                </span>
                {totalPrice || 0}{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="pt-5">
          <Button
            onClick={handleBooking}
            className={`${
              sumGuest < 1 ? "bg-default" : "bg-cyan-500"
            } w-full text-lg text-white rounded-md shadow-inner`}
            disabled={sumGuest < 1 ? true : false}
          >
            Đặt Tour
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
