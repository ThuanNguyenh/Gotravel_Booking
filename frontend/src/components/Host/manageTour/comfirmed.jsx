/* eslint-disable no-unused-vars */
import { Button, Card, CardBody, Image, Chip } from "@nextui-org/react";
import { useState, useEffect } from "react";
import axios from "axios";

function ComfirmedBooking() {
  const [dataTour, setDataTour] = useState([]);

  // get userId from localStorage
  const userString = localStorage.getItem("userInfo");
  const user = JSON.parse(userString);
  const userId = user?.userId;

  const getBooking = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/booking/${userId}&CONFIRMED`
      );
      setDataTour(response.data);
    } catch (error) {
      console.log("Error");
    }
  };

  useEffect(() => {
    getBooking();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div>
        {/* Map over the data to render each row dynamically */}
        {dataTour?.length > 0 ? (
          dataTour?.map((tour) => (
            <Card
              key={tour.bookingId}
              isBlurred
              className="border-none my-4 bg-background/60 dark:bg-default-100/50"
            >
              <CardBody>
                <div className="grid grid-cols-6 md:grid-cols-12 md:gap-4 items-center justify-center">
                  <div className="relative col-span-3 md:col-span-3">
                    <Image
                      style={{ height: "150px", objectFit: "cover" }}
                      shadow="md"
                      src={tour.tour.thumbnail}
                      width="100%"
                    />
                  </div>

                  <div className="flex flex-col col-span-5 md:col-span-5">
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col gap-0">
                        <p className="font-semibold text-lg">
                          {tour.tour.tourName}
                        </p>
                        <div className="flex flex-row gap-2">
                          <span className="text-[1.1em]"> Người đặt:</span>
                          <span className="font-semibold text-[1.1em]">
                            {tour.user.userName}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col w-fit justify-between text-[1.1em]">
                        <div className="flex gap-3">
                          <span className="">Ngày đi:</span>
                          <span className="">{tour.tour.startDate}</span>
                        </div>
                        <div className="flex gap-3">
                          <span className="">Ngày về:</span>
                          <span className="">{tour.tour.endDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col col-span-4 md:col-span-4 items-end gap-5 text-right h-full  justify-between">
                    <div className="font-semibold text-xl">
                      <div>${tour.totalPrice}</div>
                      <Chip color="primary" size="sm">
                        {tour.status}
                      </Chip>
                    </div>
                    <div className="flex gap-3">
                      {/* <Button
                            onPress={() =>
                              handleOpenDetailModal(tour.bookingId)
                            } // Pass tour ID
                            variant="bordered"
                            radius="full"
                            size="lg"
                          >
                            Detail
                          </Button>
                          <Modal
                            backdrop="transparent"
                            hideCloseButton
                            isOpen={isOpen}
                            onOpenChange={onOpenChange}
                          >
                            <ModalContent>
                              {(onClose) => (
                                <DetailTour
                                  tourId={selectedTourId}
                                  onClose={onClose}
                                />
                              )}
                            </ModalContent>
                          </Modal> */}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))
        ) : (
          <div>Không có booking nào.</div>
        )}
      </div>
    </div>
  );
}

export default ComfirmedBooking;
