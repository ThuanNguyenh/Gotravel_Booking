import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Chip,
  Input,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import axios from "axios";
import "./manageTour/manageTour.css";
import { useEffect, useState } from "react";
import { ChevronDownIcon } from "../../assets/ChevronDownIcon ";
import { SearchIcon } from "../../assets/SearchIcon";

export default function ViewBookingTours() {
  // state data
  const [dataTour, setDataTour] = useState([]);
  const [message, setMessage] = useState(null);

  // get token from localStorage
  const token = localStorage.getItem("accessToken");

  // get userId from localStorage
  const userString = localStorage.getItem("userInfo");
  const user = JSON.parse(userString);
  const userId = user?.userId;

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
        `http://localhost:8080/api/v1/booking/booking-tour-date/${userId}`,
        config
      );
      setDataTour(response.data);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    getDataTour();
  }, []);

  // convert confirmation
  const getStatus = (status) => {
    switch (status) {
      case "PENDING":
        return { text: "Chờ xác nhận", color: "warning" };
      case "IN_PROGRESS":
        return { text: "Đang diễn ra", color: "success" };
      case "COMPLETED":
        return { text: "Đã hoàn thành", color: "primary" };
      default:
        return { text: "không xác định", color: "default" };
    }
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 5;

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

  const isTourVisible = (tour) => {
    const matchesSearchQuery = tour.tourName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatusFilter =
      selectedStatusFilters.length === 0 ||
      selectedStatusFilters.includes(tour.province);
    return matchesSearchQuery && matchesStatusFilter;
  };

  // Filter tours based on search query and status filters
  const filteredTours = dataTour.filter(isTourVisible);

  // Calculate indexes for slicing tours array based on current page
  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = filteredTours.slice(indexOfFirstTour, indexOfLastTour);

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
                {dataTour?.map((dataTour) => (
                  <DropdownItem
                    key={dataTour.tourId}
                    className="capitalize"
                    onClick={() => toggleStatusFilter(dataTour.province)}
                  >
                    {capitalize(dataTour?.province)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        {dataTour?.length > 0 ? (
          <div>
            <Table layout="fixed" aria-label="Example static collection table">
              <TableHeader>
                <TableColumn style={{ width: "350px" }}>TÊN TOUR</TableColumn>
                <TableColumn style={{ width: "150px" }}>VỊ TRÍ</TableColumn>
                <TableColumn style={{ width: "100px" }}>THỜI GIAN</TableColumn>
                <TableColumn style={{ width: "110px" }}>LƯỢNG KHÁCH</TableColumn>
                <TableColumn style={{ width: "100px" }}>KHÁCH ĐẶT</TableColumn>
                <TableColumn style={{ width: "150px" }}>NGÀY BẮT ĐẦU</TableColumn>
                <TableColumn style={{ width: "150px" }}>$ TỔNG THU</TableColumn>
                <TableColumn style={{ width: "150px" }}>TRẠNG THÁI</TableColumn>
              </TableHeader>
              <TableBody>
                {/* Map over the currentTours to render each row dynamically */}
                {currentTours?.map((tour) => (
                  <TableRow key={tour.tourId}>
                    <TableCell>
                      {tour.tourName}
                    </TableCell>
                    <TableCell>
                      {/* <Chip className="capitalize" size="sm" variant="flat"> */}
                      {tour.province}
                      {/* </Chip> */}
                    </TableCell>

                    <TableCell>{tour.tourTime} ngày</TableCell>

                    <TableCell>{tour.numGuest}</TableCell>

                    <TableCell>{tour.numGuestBooked}</TableCell>

                    <TableCell>
                      {/* <Chip className="capitalize" size="sm" variant="flat"> */}
                      {tour.checkInDate}
                      {/* </Chip> */}
                    </TableCell>

                    <TableCell>{tour.totalPriceBooked}</TableCell>

                    <TableCell>
                      <Chip
                        className="capitalize"
                        size="small"
                        variant="dot"
                        color={getStatus(tour.confirmation).color}
                      >
                        {getStatus(tour.confirmation).text}
                      </Chip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          "KHÔNG CÓ DỮ LIỆU"
        )}

        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            page={currentPage}
            total={Math.ceil(filteredTours.length / toursPerPage)}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
