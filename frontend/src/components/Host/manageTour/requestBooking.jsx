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
  } from "@nextui-org/react";

  import { SearchIcon } from "../../../assets/SearchIcon";
  import { ChevronDownIcon } from "../../../assets/ChevronDownIcon ";
  import { useState } from "react";

//Confirm Function
function useConfirmation() {
    const [confirmedTours, setConfirmedTours] = useState([]);
    const [declinedTours, setDeclinedTours] = useState([]);

    const confirmTour = (tourId) => {
      setConfirmedTours((prevConfirmedTours) => [...prevConfirmedTours, tourId]);
    };
  
    const isTourConfirmed = (tourId) => {
      return confirmedTours.includes(tourId);
    };

    const declineTour = (tourId) => {
      setDeclinedTours((prevDeclinedTours) => [...prevDeclinedTours, tourId]);
    };

    const isTourDeclined = (tourId) => {
      return declinedTours.includes(tourId);
    };
  
    return {
      confirmTour,
      isTourConfirmed,
      declineTour,
      isTourDeclined,
    };
  }
  


  
function RequestBooking() {

    const statusColorMap = {
      Active: "success",
      Paused: "danger",
      Ongoing: "primary",
    };
  
    const statusOptions = [
      { name: "Active", uid: "active" },
      { name: "Paused", uid: "paused" },
      { name: "Ongoing", uid: "ongoing" },
    ];
  
    const tours = [
        { id: 1, name: "Da Nang", status: "Active", user: "John Doe", price: 100 },
        { id: 2, name: "Hue", status: "Paused", user: "Jane Doe", price: 150 },
        { id: 3, name: "Vung Tau", status: "Active", user: "Alice", price: 120 },
        { id: 4, name: "Da Lat", status: "Ongoing", user: "Bob", price: 200 },
    ];
  
    //search
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };
    // Filter tours based on the search query
    const filteredTours = tours.filter((tour) =>
      tour.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    //filter status
    const [selectedStatusFilters, setSelectedStatusFilters] = useState([]);
    const toggleStatusFilter = (status) => {
      if (selectedStatusFilters.includes(status)) {
        setSelectedStatusFilters(selectedStatusFilters.filter((s) => s !== status));
      } else {
        setSelectedStatusFilters([...selectedStatusFilters, status]);
      }
    };
    const isTourVisible = (tour) => {
      const matchesSearchQuery = tour.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatusFilter =
        selectedStatusFilters.length === 0 || selectedStatusFilters.includes(tour.status);
      return matchesSearchQuery && matchesStatusFilter;
    };
  
    //Caplock
    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    //display button
    const [selectedTours, setSelectedTours] = useState([]);

    //Confirm Button
    const { confirmTour, isTourConfirmed, declineTour, isTourDeclined } = useConfirmation();
  
  
    return (
      <div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-3 items-end">
            <Input
              isClearable
              className="w-full sm:max-w-[44%]"
              placeholder="Search by name..."
              size="sm"
              startContent={<SearchIcon />}
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <div className="flex gap-3">
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button
                    endContent={<ChevronDownIcon className="text-small" />}
                    variant="flat"
                  >
                    {selectedStatusFilters.length > 0
                      ? selectedStatusFilters.join(", ")
                      : "Status"}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Table Columns"
                  disallowEmptySelection
                  selectionMode="single"
                >
                  {statusOptions.map((status) => (
                    <DropdownItem
                      key={status.name}
                      className="capitalize"
                      onClick={() => toggleStatusFilter(status.name)}
                    >
                      {capitalize(status.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>

          <div>
            {/* Map over the data to render each row dynamically */}
            {filteredTours.map((tour) => {
              const isSelected = selectedTours.includes(tour.id);
              if (isTourVisible(tour)) {
                return (
                  <Card
                    key={tour.id}
                    isBlurred
                    className="border-none my-4 bg-background/60 dark:bg-default-100/50"
                  >
                    <CardBody>
                      <div className="grid grid-cols-6 md:grid-cols-12 md:gap-4 items-center justify-center">
                        <div className="relative col-span-3 md:col-span-3">
                          <Image
                            height={150}
                            shadow="md"
                            src="https://img.directbooking.ro/getimage.ashx?f=Statiuni&w=600&h=399&file=Statiune_2cc49871-736f-43c5-a388-b4d0c4d1c06b.jpg"
                            width="100%"
                          />
                        </div>

                        <div className="flex flex-col col-span-5 md:col-span-5">
                          <div className="flex flex-col justify-between gap-5">
                            <div className="flex flex-col gap-0">
                              <h3 className="font-semibold text-2xl text-foreground/90">
                                {tour.name}
                              </h3>
                              <div className="flex flex-row">
                                <p className="text-lg text-foreground/80">
                                  From {tour.user}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-row bg-slate-100 w-fit gap-5 p-3 justify-between text-medium font-lights text-slate-500">
                              <div>
                                <h1 className="">Check in</h1>
                                <h1 className="">Date</h1>
                              </div>
                              <div>
                                <h1 className="">Check out</h1>
                                <h1 className="">Date</h1>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col col-span-4 md:col-span-4 items-end gap-5 text-right h-full  justify-between">
                          <div className="font-semibold text-2xl text-foreground/90">
                            <div>${tour.price}/night</div>
                            <Chip className="capitalize" color={statusColorMap[tour.status]} size="sm" variant="flat">
                              {tour.status}
                            </Chip>
                          </div>
                          <div className="flex gap-3">
                            {!isSelected && ( // Render buttons only if tour is not selected
                              <>
                                <Button
                                  className="w-24 text-lg"
                                  size="lg"
                                  radius="full"
                                  onClick={() => {
                                    confirmTour(tour.id);
                                    setSelectedTours([...selectedTours, tour.id]); // Add tour to selectedTours
                                  }}
                                  disabled={isTourConfirmed(tour.id) || isTourDeclined(tour.id)}
                                  variant={isTourConfirmed(tour.id) ? "solid" : "bordered"}
                                  color={isTourConfirmed(tour.id) ? "primary" : "default"}
                                >
                                  {isTourConfirmed(tour.id) ? "Confirmed" : "Confirm"}
                                </Button>
                                <Button
                                  className="w-24 text-lg"
                                  size="lg"
                                  radius="full"
                                  onClick={() => {
                                    declineTour(tour.id);
                                    setSelectedTours([...selectedTours, tour.id]); // Add tour to selectedTours
                                  }}
                                  disabled={isTourConfirmed(tour.id) || isTourDeclined(tour.id)}
                                  variant="bordered"
                                  color="default"
                                >
                                  {isTourDeclined(tour.id) ? "Declined" : "Decline"}
                                </Button>
                              </>
                            )}
                            {isSelected && ( // Render only the confirmed or declined button if tour is selected
                              <Button
                                className="w-24 text-lg"
                                size="lg"
                                radius="full"
                                variant="solid"
                                color={isTourConfirmed(tour.id) ? "primary" : "danger"}
                              >
                                {isTourConfirmed(tour.id) ? "Confirmed" : "Declined"}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    );
  }
  
  export default RequestBooking;


