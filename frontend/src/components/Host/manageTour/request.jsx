/* eslint-disable no-unused-vars */
import {
    Input,
    Dropdown,
    DropdownTrigger,
    Button,
    DropdownMenu,
    DropdownItem,
    Card,
    CardBody,
    Image,
    Chip,
    useDisclosure,
    Modal,
    ModalContent,
  } from "@nextui-org/react";

  import { SearchIcon } from "../../../assets/SearchIcon";
  import { ChevronDownIcon } from "../../../assets/ChevronDownIcon ";
  import { useState, useCallback, useEffect } from "react";
import DetailTour from "./detailTour";
import axios from "axios";

function Request() {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [ dataTour, setDataTour ] = useState([]);

  // get userId from localStorage
  const userString = localStorage.getItem("userInfo");
  const user = JSON.parse(userString);
  const userId = user?.userId;

  const getBooking = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/booking/${userId}&PENDING`,
        
      );
      setDataTour(response.data);
      console.log("all booking:", response.data);
    } catch (error) {
      console.log("Error")
    }
  };

  useEffect(() => {
    getBooking();
  }, []);
  
  const confirmBooking = async (bookingId) => {
    try {

      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',  // Thêm dòng này để chỉ định nguồn được phép
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',  // Thêm dòng này để chỉ định các phương thức được phép
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'  // Thêm dòng này để chỉ định các headers được phép
        },
      };

      const response = await axios.post(
        `http://localhost:8080/api/v1/booking/update/${bookingId}&CONFIRMED`,
      );
      setDataTour(response.data);
      console.log("booking comfirmed:", response.data);
    } catch (error) {
      console.log("Error")
    }
  };

  const denyBooking = async (bookingId) => {
    try {

      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',  // Thêm dòng này để chỉ định nguồn được phép
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',  // Thêm dòng này để chỉ định các phương thức được phép
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'  // Thêm dòng này để chỉ định các headers được phép
        },
      };

      const response = await axios.post(
        `http://localhost:8080/api/v1/booking/update/${bookingId}&CANCEL`,
      );
      setDataTour(response.data);
      console.log("booking comfirmed:", response.data);
    } catch (error) {
      console.log("Error")
    }
  };
  
  
    return (
      <div>
        <div className="flex flex-col gap-4">
          <div>
            {/* Map over the data to render each row dynamically */}
            {dataTour.length > 0 ? (
              dataTour.map((tour) => (
                <Card
                  key={tour.bookingId}
                  isBlurred
                  className="border-none my-4 bg-background/60 dark:bg-default-100/50"
                >
                  <CardBody>
                    <div className="grid grid-cols-6 md:grid-cols-12 md:gap-4 items-center justify-center">
                      <div className="relative col-span-3 md:col-span-3">
                        <Image
                          height={150}
                          shadow="md"
                          src={tour.tour.thumbnail}
                          width="100%"
                        />
                      </div>

                      <div className="flex flex-col col-span-5 md:col-span-5">
                        <div className="flex flex-col justify-between gap-5">
                          <div className="flex flex-col gap-0">
                            <h3 className="font-semibold text-2xl text-foreground/90">
                              {tour.tour.tourName}
                            </h3>
                            <div className="flex flex-row">
                              <p className="text-lg text-foreground/80">
                                From {tour.user.userName}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-row bg-slate-100 w-fit gap-5 p-3 justify-between text-medium font-lights text-slate-500">
                            <div>
                              <h1 className="">Check in</h1>
                              <h1 className="">{tour.tour.startDate}</h1>
                            </div>
                            <div>
                              <h1 className="">Check out</h1>
                              <h1 className="">{tour.tour.endDate}</h1>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col col-span-4 md:col-span-4 items-end gap-5 text-right h-full  justify-between">
                        <div className="font-semibold text-2xl text-foreground/90">
                          <div>${tour.totalPrice}</div>
                          <Chip color="primary">{tour.status}</Chip>
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
                        <Button
                            className="w-24 text-lg"
                            size="lg"
                            onClick={() => denyBooking(tour.bookingId)}
                            color="danger"
                            radius="full"
                          >
                            Deny
                          </Button>

                          <Button
                            className="w-24 text-lg"
                            size="lg"
                            onClick={() => confirmBooking(tour.bookingId)}
                            color="primary"
                            radius="full"
                          >
                            Confirm
                          </Button>

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
      </div>
    );
  }
  
  export default Request;