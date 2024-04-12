/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Chip,
  Tooltip,
  Input,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
  Modal,
  ModalContent,
} from "@nextui-org/react";

import { Pen } from "../../../assets/Pen";
import { DeleteIcon } from "../../../assets/DeleteIcon";
import { SearchIcon } from "../../../assets/SearchIcon";
import { ChevronDownIcon } from "../../../assets/ChevronDownIcon ";
import { PlusIcon } from "../../../assets/PlusIcon";
import { useState } from "react";
import { Percent } from "../../../assets/Percent";

import NewTourForm from "./newTour";

function ManageTour() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
    { id: 1, name: "Da Nang", status: "Active" },
    { id: 2, name: "Hue", status: "Paused" },
    { id: 3, name: "Vung Tau", status: "Active" },
    { id: 4, name: "Da Lat", status: "Ongoing" },
    { id: 5, name: "Ho Chi Minh City", status: "Active" },
    { id: 6, name: "Hanoi", status: "Paused" },
    { id: 7, name: "Nha Trang", status: "Active" },
    { id: 8, name: "Phu Quoc", status: "Ongoing" },
    { id: 9, name: "Mui Ne", status: "Active" },
    { id: 10, name: "Hoi An", status: "Paused" },
    { id: 11, name: "Sapa", status: "Active" },
    { id: 12, name: "Can Tho", status: "Ongoing" },
    { id: 13, name: "Phan Thiet", status: "Active" },
    { id: 14, name: "Quy Nhon", status: "Paused" },
    { id: 15, name: "Hai Phong", status: "Active" },
    { id: 16, name: "Ha Long Bay", status: "Ongoing" }
  ];
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 5;

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate indexes for slicing tours array based on current page
  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = tours.slice(indexOfFirstTour, indexOfLastTour);
 

  //search
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

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

  // Filter tours based on the search query
  const filteredTours = currentTours.filter(
    (tour) =>
      tour.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedStatusFilters.length === 0 ||
        selectedStatusFilters.includes(tour.status))
  );

  //Caplock
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


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

            <Button color="primary" onPress={onOpen} endContent={<PlusIcon />}>
              Add New
            </Button>
            <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <NewTourForm/>
                )}
              </ModalContent>
            </Modal>
          </div>
        </div>

        <div>
          <Table layout="fixed" aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ACTION</TableColumn>
            </TableHeader>
            <TableBody>
              {/* Map over the data to render each row dynamically */}
              {filteredTours.map((tour) => {
                if (isTourVisible(tour)) {
                  return (
                    
                    <TableRow key={tour.id}>
                      <TableCell>{tour.name}</TableCell>
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
                        <div className="relative flex items-center gap-4">
                          <Tooltip content="Voucher">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                              <Percent />
                            </span>
                          </Tooltip>
                          <Tooltip content="Edit">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                              <Pen />
                            </span>
                          </Tooltip>
                          <Tooltip color="danger" content="Delete">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                              <DeleteIcon />
                            </span>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                }
                return null;
              })}
            </TableBody>
          </Table>
        </div>

        <div className="flex w-full justify-center">
          <Pagination
          isCompact
          showControls
          showShadow
          page={currentPage}
          total={Math.ceil(tours.length / toursPerPage)}
          onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default ManageTour
