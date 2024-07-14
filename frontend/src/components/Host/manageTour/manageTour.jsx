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
  Switch,
} from "@nextui-org/react";

import { Pen } from "../../../assets/Pen";
import { DeleteIcon } from "../../../assets/DeleteIcon";
import { SearchIcon } from "../../../assets/SearchIcon";
import { ChevronDownIcon } from "../../../assets/ChevronDownIcon ";
import { PlusIcon } from "../../../assets/PlusIcon";
import { useEffect, useState } from "react";
import { Percent } from "../../../assets/Percent";
import { Alert, DeleteAlert } from "../../Alert/Alert";

import axios from "axios";
import "./manageTour.css";
import Empty from "../../alert/Empty";
import { useNavigate } from "react-router-dom";

// status
const listStatusFil = [
  {
    title: "Đang hoạt động",
    status: "true",
  },
  {
    title: "Không hoạt động",
    status: "false",
  },
  {
    title: "Tất cả",
    status: "",
  },
];

const ManageTour = ({ handleLinkClick, selectedTourId }) => {
  const voucherModal = useDisclosure();

  const navigate = useNavigate();

  const [tourStatus, setTourStatus] = useState({});

  // state data
  const [dataTour, setDataTour] = useState([]);
  const [message, setMessage] = useState(null);

  const [status, setStatus] = useState("");
  const [statusName, setStatusName] = useState("Tất cả");

  console.log("data: ", tourStatus);

  // Hàm để cập nhật trạng thái của tour dựa trên ID
  const updateTourStatus = (tourId, value) => {
    const status = value === "true";
    setTourStatus((prevStatus) => ({
      ...prevStatus,
      [tourId]: status,
    }));
    handleUpdateStatus(tourId, status); // Gọi hàm cập nhật trạng thái
  };

  // Hàm để lấy trạng thái của tour dựa trên ID
  const getTourStatus = (tourId) => {
    return tourStatus[tourId] || false; // Mặc định là false nếu không có trạng thái
  };

  // get token from localStorage
  const token = localStorage.getItem("accessToken");

  // get userId from localStorage
  const userString = localStorage.getItem("userInfo");
  const user = JSON.parse(userString);
  const userId = user?.userId;

  // get all tour

  useEffect(() => {
    async function getDataTour() {
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

        const params = {};

        if (status) {
          params.status = status;
        }

        // xây dựng URL với các tham số truy vấn
        const queryString = new URLSearchParams(params).toString();
        const URL = `http://localhost:8080/api/v1/tour/my-tour/${userId}/status?${queryString}`;

        // Thay đổi URL của trình duyệt
        navigate(`/host?${queryString}`, { replace: true });

        const response = await axios.get(URL, config);
        const toursData = response.data;

        setDataTour(toursData);
      } catch (error) {
        setMessage(error.response.data.message);
      }
    }

    getDataTour();
  }, [status, userId, token, navigate]);

  console.log("trạng thái: ", dataTour);

  //delete tour
  const deleteTour = async (tourId) => {
    try {
      if (!token) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await DeleteAlert(async () => {
        const response = await axios.delete(
          `http://localhost:8080/api/v1/tour/delete/${tourId}`,
          config
        );
        if (response.status === 200) {
          Alert(1000, "Xóa tour", "Thành công", "success");
          // Update the frontend state to remove the deleted tour
          setDataTour(dataTour.filter((tour) => tour.tourId !== tourId));
        } else {
          alert("Thất bại: không tìm thấy tour!");
        }
      });
    } catch (error) {
      console.error("Error deleting tour:", error);
      alert("Thất bại: lỗi hệ thống!");
    }
  };

  // CẬP NHẬT TRẠNG THÁI TOUR
  const handleUpdateStatus = async (tourId, status) => {
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

      const params = new URLSearchParams({ status });

      const response = await axios.put(
        `http://localhost:8080/api/v1/tour/${tourId}/update-status?${params}`,
        null,
        config
      );
      if (response.status === 200) {
        Alert(1000, "Cập nhật trạng thái tour", "Thành công", "success");
      } else {
        alert("Thất bại: không cập nhật được trạng thái tour!");
      }
    } catch (error) {
      console.error("loooo: ", error);
    }
  };

  //update button
  const handleUpdate = async (tourId) => {
    selectedTourId(tourId);
    handleLinkClick("UpdateTour");
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 9;

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
  const isTourVisible = (tour) => {
    const matchesSearchQuery =
      tour.tourName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.province.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearchQuery;
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
      <div className="flex flex-col gap-4 w-[110%]">
        <div className="flex justify-between gap-3 items-end">
          <Input
            variant="faded"
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Tìm kiếm theo tên tour hoặc địa điểm..."
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
                  {statusName}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Table Columns"
                disallowEmptySelection
                selectionMode="single"
              >
                {listStatusFil?.map((status) => (
                  <DropdownItem
                    key={status.title}
                    className="capitalize"
                    onClick={() => {
                      setStatus(status.status), setStatusName(status.title);
                    }}
                  >
                    {status.title}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Button
              onClick={() => handleLinkClick("NewTour")}
              color="primary"
              endContent={<PlusIcon />}
            >
              Thêm mới
            </Button>
          </div>
        </div>

        {dataTour?.length > 0 ? (
          <>
            <div>
              <Table
                layout="fixed"
                aria-label="Example static collection table"
              >
                <TableHeader>
                  <TableColumn className="w-[350px]">TÊN</TableColumn>
                  <TableColumn className="w-[150px]">VỊ TRÍ</TableColumn>
                  <TableColumn>GIÁ LỚN</TableColumn>
                  <TableColumn>GIÁ NHỎ</TableColumn>
                  <TableColumn>KHÁCH</TableColumn>
                  <TableColumn className="w-[90px]">THỜI GIAN</TableColumn>
                  <TableColumn className="w-[160px]">NGÀY TẠO</TableColumn>
                  <TableColumn className="w-[100px]">TRẠNG THÁI</TableColumn>
                  <TableColumn className="w-[100px]">HÀNH ĐỘNG</TableColumn>
                </TableHeader>
                <TableBody>
                  {/* Map over the currentTours to render each row dynamically */}
                  {currentTours?.map((tour) => (
                    <TableRow key={tour.tourId}>
                      <TableCell>{tour.tourName}</TableCell>
                      <TableCell>
                        {/* <Chip className="capitalize" size="sm" variant="flat"> */}
                        {tour.province}
                        {/* </Chip> */}
                      </TableCell>
                      <TableCell>$ {tour.priceAdult}</TableCell>

                      <TableCell>$ {tour.priceChildren}</TableCell>

                      <TableCell>
                        {/* <Chip className="capitalize" size="sm" variant="flat"> */}
                        {tour.numGuest}
                        {/* </Chip> */}
                      </TableCell>

                      <TableCell>{tour.tourTime} ngày</TableCell>

                      <TableCell>{tour.createAt}</TableCell>

                      <TableCell>
                        {/* điều chỉnh trạng thái */}
                        <Switch
                          size="sm"
                          isSelected={getTourStatus(tour.tourId)}
                          onChange={(value) =>
                            updateTourStatus(tour.tourId, value)
                          }
                        />
                      </TableCell>

                      <TableCell>
                        <div className="relative flex items-center gap-4">
                          {/* Update */}
                          <Tooltip content="Edit">
                            <span
                              onClick={() => handleUpdate(tour.tourId)}
                              className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            >
                              <Pen />
                            </span>
                          </Tooltip>

                          {/* Delete */}
                          <Tooltip color="danger" content="Delete">
                            <span
                              onClick={() => deleteTour(tour.tourId)}
                              className="text-lg text-danger cursor-pointer active:opacity-50"
                            >
                              <DeleteIcon />
                            </span>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* phân trang */}
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
          </>
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
};

export default ManageTour;
