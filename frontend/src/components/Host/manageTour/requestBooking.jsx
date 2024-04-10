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

  import { SearchIcon } from "../../../assets/SearchIcon";
  import { ChevronDownIcon } from "../../../assets/ChevronDownIcon ";
  import { useState } from "react";

//Confirm Function
function useConfirmation() {
    const [confirmedTours, setConfirmedTours] = useState([]);
  
    const confirmTour = (tourId) => {
      setConfirmedTours((prevConfirmedTours) => [...prevConfirmedTours, tourId]);
    };
  
    const isTourConfirmed = (tourId) => {
      return confirmedTours.includes(tourId);
    };
  
    return {
      confirmTour,
      isTourConfirmed,
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

    //Confirm Button
    const { confirmTour, isTourConfirmed } = useConfirmation();
  
  
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
                    {selectedStatusFilters.length > 0 ? selectedStatusFilters.join(', ') : 'Status'} 
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
            <Table layout="fixed" aria-label="Example static collection table">
              <TableHeader>
                <TableColumn>CUSTOMER</TableColumn>
                <TableColumn>TOUR</TableColumn>
                <TableColumn>PRICE</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>ACTION</TableColumn>
              </TableHeader>
              <TableBody>
                {/* Map over the data to render each row dynamically */}
                {filteredTours.map((tour) => {
                  if (isTourVisible(tour)) {
                    return (
                      <TableRow key={tour.id}>
                        <TableCell>{tour.user}</TableCell>
                        <TableCell>{tour.name}</TableCell>
                        <TableCell>${tour.price}</TableCell>
                        <TableCell>
                          <Chip
                            className="capitalize"
                            color={statusColorMap[tour.status]}
                            size="sm"
                            variant="flat"
                          >
                            {tour.status}
                          </Chip>
                        </TableCell>
                        <TableCell>
                            <Button
                                className="w-20"
                                size="sm"
                                radius='full'
                                onClick={() => confirmTour(tour.id)}
                                disabled={isTourConfirmed(tour.id)}
                                variant={isTourConfirmed(tour.id) ? "solid" : "bordered"}
                                color={isTourConfirmed(tour.id) ? "primary" : "default"}
                            >
                            {isTourConfirmed(tour.id) ? "Confirmed" : "Confirm"}
                            </Button>
                        </TableCell>
                      </TableRow>
                    );
                  }
                  return null;
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
  
  export default RequestBooking;
