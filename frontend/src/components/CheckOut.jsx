import { Button, Card, CardBody, Image } from "@nextui-org/react";
import { LocationIcon } from "../assets/LocationIcon";
import { useEffect, useState } from "react";
import PaypalButton from "./Payment/PaypalButton";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Alert } from "./Alert/Alert";

function CheckOut() {
  const { tourId } = useParams();
  const [dataTour, setDataTour] = useState([]);

  // get token from localStorage
  const token = localStorage.getItem("accessToken");

  // get userId from localStorage
  const userString = localStorage.getItem("userInfo");
  const user = JSON.parse(userString);
  const userId = user?.userId;

  const currency = "USD";
  const method = "SALE";
  const intent = "PAYPAL";

  // get data tour
  const getDataTour = async () => {
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
        `http://localhost:8080/api/v1/tour/${tourId}`,
        config
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

  //Select number of customer
  const [adult, setAdult] = useState(0);
  const pricePerAdult = 10;

  const incrementNumberA = () => {
    setAdult((prevNumber) => prevNumber + 1);
  };

  const decrementNumberA = () => {
    if (adult > 0) {
      setAdult((prevNumber) => prevNumber - 1);
    }
  };

  const [children, setChildren] = useState(0);
  const pricePerChildren = 5;

  const incrementNumberC = () => {
    setChildren((prevNumber) => prevNumber + 1);
  };

  const decrementNumberC = () => {
    if (children > 0) {
      setChildren((prevNumber) => prevNumber - 1);
    }
  };

  const price = adult * pricePerAdult + children * pricePerChildren;

  const discount = 10;

  const totalPrice = price - discount;

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
  });

  console.log("data booking: ", dataBooking);

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
    }));
  }, [adult, children, totalPrice, userId, tourId, currency, method, intent]);

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

      // kiểm tra xem có approvalUrl trong response không
      if (response && response?.data?.approvalUrl) {
        // chuyển hướng đến approvalUrl
       window.location.href = response?.data?.approvalUrl;
      } else {
        Alert(2000, "Đặt phòng", "Không tìm thấy approvalUrl.", "error");
      }
    } catch (error) {
      Alert(
        2000,
        "Đặt phòng",
        "Đặt phòng không thành công. Vui lòng thử lại.",
        "error"
      );
    }
  };

  

  return (
    <div className="grid grid-cols-6 md:grid-cols-12 md:gap-4 p-[3%]">
      {/* Detail Tour & Selection */}
      <div className="flex flex-col col-span-9 md:col-span-9">
        <div className="bg-slate-100 rounded-lg">
          <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50"
            shadow="none"
          >
            <CardBody>
              <div className="grid grid-cols-6 md:grid-cols-12 md:gap-4 items-center justify-center">
                <div className="relative col-span-3 md:col-span-3">
                  <Image
                    // height={150}
                    style={{ height: "150px" }}
                    shadow="md"
                    src={dataTour.thumbnail}
                    width="100%"
                  />
                </div>

                <div className="flex flex-col col-span-6 md:col-span-6">
                  <div className="flex flex-col  justify-between gap-5">
                    <div className="flex flex-col gap-0 mt-2">
                      <h3 className="font-semibold text-2xl text-foreground/90">
                        {dataTour.tourName}
                      </h3>
                      <div className="flex flex-row pt-2">
                        <LocationIcon />
                        <p className="text-small text-foreground/80 text-[#73D8FC]">
                          {dataTour.detailAddress}, {dataTour.ward},{" "}
                          {dataTour.district}, {dataTour.province}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col w-fit p-4 justify-between text-medium font-lights text-slate-500">
                      <div className="flex gap-4">
                        <h1 className="">Ngày bắt đầu</h1>
                        <h1 className="">{dataTour.startDate}</h1>
                      </div>
                      <div className="flex gap-4">
                        <h1 className="">Ngày kết thúc</h1>
                        <h1 className="">{dataTour.endDate}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
          <div className="p-4 flex flex-col gap-4 text-[1.1em]">
            <div className="">Lượng khách tối đa {dataTour.numGuest}</div>
            <div className="flex gap-4 ">
              <div className="font-semibold">Người lớn</div>
              <div className="flex items-center gap-2">
                <Button size="sm" onClick={decrementNumberA} isIconOnly>
                  -
                </Button>
                <div className="font-semibold text-lg">{adult}</div>
                <Button size="sm" onClick={incrementNumberA} isIconOnly>
                  +
                </Button>
              </div>
            </div>

            <div className="flex gap-11">
              <div className="font-semibold">Trẻ em</div>
              <div className="flex items-center gap-2">
                <Button size="sm" onClick={decrementNumberC} isIconOnly>
                  -
                </Button>
                <div className="font-semibold text-lg">{children}</div>
                <Button size="sm" onClick={incrementNumberC} isIconOnly>
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price BreakUp */}
      <div className="col-span-3 md:col-span-3">
        <div className="bg-slate-100 rounded-lg p-2">
          <div className="rounded flex flex-col justify-start items-start">
            <div className="text-black text-xl font-bold">Thanh toán</div>

            <div className="py-2.5 border-b border-gray-300 w-full flex justify-between">
              <div className="text-sm font-medium text-gray-600">Giá cơ sở</div>
              <div className="font-semibold">${dataTour.price}</div>
            </div>

            <div className="py-2.5 border-b border-gray-300 w-full flex justify-between">
              <div className="text-sm font-medium text-blue-500">
                khuyến mãi
              </div>
              <div className="font-semibold">${dataTour.discount}</div>
            </div>

            <div className="py-2.5 w-full flex justify-between">
              <div className="text-md font-semibold text-gray-600">
                Tổng tiền{" "}
              </div>
              <div className="font-semibold">${totalPrice}</div>
            </div>
          </div>
        </div>
        <div className="pt-5">
          <Button
            onClick={handleBooking}
            className="w-full text-lg text-white bg-[#73D8FC]"
          >
            Đặt phòng
          </Button>
        </div>
        <div className="pt-5">
          <PaypalButton />
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
