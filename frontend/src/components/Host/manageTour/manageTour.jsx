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
  ModalHeader,
  ModalBody,
} from "@nextui-org/react";

import { Pen } from "../../../assets/Pen";
import { DeleteIcon } from "../../../assets/DeleteIcon";
import { SearchIcon } from "../../../assets/SearchIcon";
import { ChevronDownIcon } from "../../../assets/ChevronDownIcon ";
import { PlusIcon } from "../../../assets/PlusIcon";
import { useEffect, useState } from "react";
import { Percent } from "../../../assets/Percent";
import axios from "axios";
import "./manageTour.css";


const ManageTour = ({ handleLinkClick }) => {
  const newTourModal = useDisclosure();
  const updateModal = useDisclosure();
  const voucherModal = useDisclosure();

  // state data
  const [dataTour, setDataTour] = useState([]);
  const [message, setMessage] = useState(null);
  // get token from localStorage
  const token = localStorage.getItem("accessToken");

  // get all tour
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
        `http://localhost:8080/api/v1/tour`,
        config
      );
      setDataTour(response.data);
      console.log("danh sach tour: ", response.data);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    getDataTour();
  }, []);


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
  const currentTours = dataTour.slice(indexOfFirstTour, indexOfLastTour);

  //search
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // //filter status
  const [selectedStatusFilters, setSelectedStatusFilters] = useState([]);
  const toggleStatusFilter = (province) => {
    if (selectedStatusFilters.includes(province)) {
      setSelectedStatusFilters(
        selectedStatusFilters.filter((s) => s !== province)
      );
    } else {
      setSelectedStatusFilters([...selectedStatusFilters, province]);
    }
  };
  const isTourVisible = (dataTour) => {
    const matchesSearchQuery = dataTour.tourName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatusFilter =
      selectedStatusFilters.length === 0 ||
      selectedStatusFilters.includes(dataTour.province);
    return matchesSearchQuery && matchesStatusFilter;
  };

  // Filter tours based on the search query
  const filteredTours = currentTours.filter(
    (dataTour) =>
      dataTour.tourName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedStatusFilters.length === 0 ||
        selectedStatusFilters.includes(dataTour.tourName))
  );

  //Caplock
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  if (message) {
    return <div>{message}</div>;
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
                {dataTour.map((dataTour) => (
                  <DropdownItem
                    key={dataTour.tourId}
                    className="capitalize"
                    onClick={() => toggleStatusFilter(dataTour.province)}
                  >
                    {capitalize(dataTour.province)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Button
              onClick={() => handleLinkClick("NewTour")}
              color="primary"
              endContent={<PlusIcon />}
            >
              Add New
            </Button>
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
              {dataTour.map((tour) => {
                if (isTourVisible(tour)) {
                  return (
                    <TableRow key={tour.tourId}>
                      <TableCell>{tour.tourName}</TableCell>
                      <TableCell>
                        <Chip
                          className="capitalize"
                          size="sm"
                          variant="flat"
                        >
                          {tour.province}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <div className="relative flex items-center gap-4">
                          {/* Add Voucher */}
                          <Tooltip content="Voucher">
                            <span
                              onClick={voucherModal.onOpen}
                              className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            >
                              <Percent />
                            </span>
                          </Tooltip>
                          <Modal
                            backdrop="transparent"
                            hideCloseButton
                            isOpen={voucherModal.isOpen}
                            onOpenChange={voucherModal.onOpenChange}
                          >
                            <ModalContent>
                              {(onClose) => (
                                <>
                                  <ModalHeader>Add Voucher</ModalHeader>
                                  <ModalBody>
                                    <div className="input-container">
                                      <input
                                        placeholder="Add % Sale here"
                                        type="text"
                                      />
                                      <button className="button">Add</button>
                                    </div>
                                  </ModalBody>
                                </>
                              )}
                            </ModalContent>
                          </Modal>

                          {/* Update */}
                          <Tooltip content="Edit">
                            <span
                              onClick={() => handleLinkClick("UpdateTour")}
                              className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            >
                              <Pen />
                            </span>
                          </Tooltip>

                          {/* Delete */}
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
            total={Math.ceil(dataTour.length / toursPerPage)}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageTour;
