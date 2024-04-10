/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
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
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <div className="mx-auto  p-8 bg-white">
                    <h1 className="text-2xl font-semibold mb-4">Create Tour</h1>
                    <form>
                      {/* Tour Name */}
                      <div className="mb-4">
                        <label
                          htmlFor="tourName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Tour Name
                        </label>
                        <input
                          type="text"
                          id="tourName"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                      </div>
                      {/* Description */}
                      <div className="mb-4">
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Description
                        </label>
                        <textarea
                          id="description"
                          rows="3"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        ></textarea>
                      </div>
                      {/* Thumbnail */}
                      <div className="mb-4">
                        <label
                          htmlFor="thumbnail"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Thumbnail
                        </label>
                        <input
                          type="text"
                          id="thumbnail"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                      </div>
                      {/* Address */}
                      <div className="mb-4">
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                      </div>
                      {/* Price */}
                      <div className="mb-4">
                        <label
                          htmlFor="price"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Price
                        </label>
                        <input
                          type="number"
                          id="price"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                      </div>
                      {/* NumGuest */}
                      <div className="mb-4">
                        <label
                          htmlFor="numGuest"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Number of Guests
                        </label>
                        <input
                          type="number"
                          id="numGuest"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                      </div>
                      {/* Submit button */}
                      <div>
                        <button
                          type="submit"
                          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Create Tour
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </ModalContent>
            </Modal>
          </div>
        </div>

        <div>
          <Table aria-label="Example static collection table">
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
      </div>
    </div>
  );
}

export default ManageTour
