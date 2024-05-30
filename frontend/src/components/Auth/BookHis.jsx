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

function BookingHistory() {
  // get userId from localStorage
  const userString = localStorage.getItem("userInfo");
  const user = JSON.parse(userString);
  const userId = user?.userId;

  const [toursBooking, setToursBooking] = useState([]);

  console.log(toursBooking);

  useEffect(() => {
    async function getToursBooking() {
      const res = await axios.get(
        `http://localhost:8080/api/v1/booking/my-booking/${userId}`
      );

      setToursBooking(res.data);
    }

    getToursBooking();
  }, [userId]);

  //filter button
  const [selectedOption, setSelectedOption] = useState(new Set(["merge"]));

  const labelsMap = {
    complete: "Completed Tour",
    going: "Tour on going",
    canceled: "Tour canceled",
  };

  const selectedOptionValue = Array.from(selectedOption)[0];

  return (
    <div>
      <div className="flex flex-col gap-10">
        <Card className="">
          <div className="px-7 py-5">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">TẤT CẢ TOUR ĐÃ ĐẶT</h2>
              <ButtonGroup variant="faded">
                <Button>{labelsMap[selectedOptionValue]}</Button>
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Button isIconOnly>
                      <ChevronDownIcon />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    aria-label="Merge options"
                    selectedKeys={selectedOption}
                    selectionMode="single"
                    onSelectionChange={setSelectedOption}
                    className="max-w-[250px]"
                  >
                    <DropdownItem key="complete">
                      {labelsMap["complete"]}
                    </DropdownItem>
                    
                  </DropdownMenu>
                </Dropdown>
              </ButtonGroup>
            </div>
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
                          <h3 className="font-semibold text-xl">
                            {tour.tour.tourName}
                          </h3>
                          <div className="flex flex-row items-end gap-2">
                            <LocationIcon className="w-5" />
                            <p className="text-[1.1em] text-foreground/80 text-[#73D8FC]">
                              {tour.tour.detailAddress}, {tour.tour.ward},
                              {tour.tour.district}, {tour.tour.province}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-row w-fit gap-5 justify-between text-medium font-lights text-slate-500">
                          <div className="flex gap-2">
                            <h1 className="">Bắt đầu: </h1>
                            <h1 className="italic font-semibold">
                              {tour.checkInDate}
                            </h1>
                          </div>
                          <div className="flex gap-2">
                            <h1 className="">Kết thúc:</h1>
                            <h1 className="italic font-semibold">
                              {tour.checkOutDate}
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col col-span-3 md:col-span-3 items-end gap-5 text-right h-full  justify-between">
                      <div className="font-semibold text-2xl text-foreground/90">
                        $ {tour.tour.priceAdult}
                      </div>

                      <div className="flex items-end gap-5 italic">
                        <div>{tour.confirmation}</div>
                        <Button
                          size="sm"
                          variant="light"
                          className="bg-[#73D8FC] text-white text-sm font-medium"
                        >
                          Chi tiết
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default BookingHistory;
