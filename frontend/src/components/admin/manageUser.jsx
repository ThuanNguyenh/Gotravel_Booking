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

import { Pen } from "../../assets/Pen";
import { DeleteIcon } from "../../assets/DeleteIcon";
import { SearchIcon } from "../../assets/SearchIcon";
import { ChevronDownIcon } from "../../assets/ChevronDownIcon ";
import { PlusIcon } from "../../assets/PlusIcon";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Alert, DeleteAlert } from "../Alert/Alert";

function ManageUser() {
  const updateUser = useDisclosure();
  const createUser = useDisclosure();

  const [upname, setupName] = useState("");
  const [uprole, setuprole] = useState("");

  // const [data, setData] = useState();

  // console.log(data);

  const roleColorMap = {
    User: "success",
    Host: "primary",
  };

  const roleOptions = [
    { name: "ROLE_HOST", uid: "host" },
    { name: "ROLE_USER", uid: "user" },
    { name: "ROLE_ADMIN", uid: "admin" },
  ];

  const [dataUser, setDataUser] = useState([
    {
      userId: "bfb4bb27-9e6f-414d-9e0e-e3d9f18b668b",
      userName: "anh",
      email: "leeanh@gmail.com",
      password: null,
      phone: null,
      province: null,
      district: null,
      ward: null,
      avatar: null,
      roles: ["ROLE_HOST"],
    },
  ]);

  const getData = async () => {
    const result = await axios.get(`http://localhost:8080/api/v1/user`);
    setDataUser(result.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const users = dataUser.map((user) => {
    return {
      id: user.userId,
      name: user.userName,
      role: user.roles[0],
    };
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 7;

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate indexes for slicing users array based on current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  //search
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  //filter role
  const [selectedRoleFilters, setSelectedRoleFilters] = useState([]);
  const toggleRoleFilter = (role) => {
    if (selectedRoleFilters.includes(role)) {
      setSelectedRoleFilters(selectedRoleFilters.filter((s) => s !== role));
    } else {
      setSelectedRoleFilters([...selectedRoleFilters, role]);
    }
  };
  const isUserVisible = (user) => {
    const matchesSearchQuery = user.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesRoleFilter =
      selectedRoleFilters.length === 0 ||
      selectedRoleFilters.includes(user.role);
    return matchesSearchQuery && matchesRoleFilter;
  };

  // Filter users based on the search query
  const filteredUsers = currentUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedRoleFilters.length === 0 ||
        selectedRoleFilters.includes(user.role))
  );

  //Caplock
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // async function deleteUser(userId) {
  //   const url = `http://localhost:8080/api/v1/user/delete/${userId}`;

  //   try {
  //     const response = await fetch(url, {
  //       method: "DELETE",
  //     });

  //     // if (!response.ok) {
  //     //     throw new Error(Error: ${response.status} - ${response.statusText});
  //     // }

  //     const result = await response.json();
  //     console.log("User deleted successfully:", result);

  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch("https://dummyjson.com/products");
  //         const data = await response.json();
  //         // setDataUser(data|| []);
  //       } catch (error) {
  //         console.error("Error fetching product data:", error);
  //       }
  //     };

  //     fetchData();
  //   } catch (error) {
  //     console.error("Error deleting user:", error);
  //   }
  // }

  //delete tour
  async function deleteUser(userId) {
    try {
      await DeleteAlert(async () => {
        const response = await axios.delete(
          // `http://localhost:8080/api/v1/tour/delete/${tourId}`
        );
        if (response.status === 200) {
          Alert(1000, "Xóa tour", "Thành công", "success");
          // Update the frontend state to remove the deleted tour
          setDataUser(dataUser.filter((user) => user.userId !== userId));
        } else {
          alert("Thất bại: không tìm thấy tour!");
        }
      });
    } catch (error) {
      console.error("Error deleting tour:", error);
      alert("Thất bại: lỗi hệ thống!");
    }
  }

  async function updateNewUser(userId) {
    const url = `http://localhost:8080/api/v1/user/update/${userId}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName: upname, roles: uprole }),
      });

      const fetchData = async () => {
        try {
          const response = await fetch("https://dummyjson.com/products");
          const data = await response.json();
          // setDataUser(data|| []);
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      };

      fetchData();

      const result = await response.json();
      console.log("User updated successfully:", result);
    } catch (error) {
      console.error("Error updating user:", error);
    }
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
                  {selectedRoleFilters.length > 0
                    ? selectedRoleFilters.join(", ")
                    : "Role"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Table Columns"
                disallowEmptySelection
                selectionMode="single"
              >
                {roleOptions.map((role) => (
                  <DropdownItem
                    key={role.name}
                    className="capitalize"
                    onClick={() => toggleRoleFilter(role.name)}
                  >
                    {capitalize(role.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            {/* <Button color="primary" endContent={<PlusIcon />}>
              Add New
            </Button> */}
          </div>
        </div>

        <div>
          <Table layout="fixed" aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>TÊN</TableColumn>
              <TableColumn>ĐIỆN THOẠI</TableColumn>
              <TableColumn>EMAIL</TableColumn>
              <TableColumn>ĐỊA CHỈ</TableColumn>
              <TableColumn>VAI TRÒ</TableColumn>
              <TableColumn>HÀNH ĐỘNG</TableColumn>
            </TableHeader>
            <TableBody>
              {/* Map over the data to render each row dynamically */}
              {filteredUsers?.map((user) => {
                if (isUserVisible(user)) {
                  return (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>0329161255</TableCell>
                      <TableCell>thuan@gmail.com</TableCell>
                      <TableCell>Đà Nẵng</TableCell>
                      <TableCell>
                        <Chip
                          className="capitalize"
                          color={roleColorMap[user.role]}
                          size="sm"
                          variant="flat"
                        >
                          {user.role}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <div className="relative flex items-center gap-4">
                          {/* Update */}
                          <Tooltip content="Edit">
                            <span
                              onClick={updateUser.onOpen}
                              className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            >
                              <Pen />
                            </span>
                          </Tooltip>

                          <Modal
                            backdrop="transparent"
                            hideCloseButton
                            isOpen={updateUser.isOpen}
                            onOpenChange={updateUser.onOpenChange}
                          >
                            <ModalContent>
                              {(onClose) => (
                                <>
                                  <ModalHeader className="px-5 justify-center text-xl">
                                    Update User
                                  </ModalHeader>
                                  <ModalBody className="px-5 pb-5">
                                    <Input
                                      label="Name"
                                      placeholder={user.name}
                                      variant="bordered"
                                      onChange={(e) =>
                                        setupName(e.target.value)
                                      }
                                    />
                                    <Input
                                      label="Role (Host or User)"
                                      placeholder={user.role}
                                      variant="bordered"
                                      onChange={(e) =>
                                        setuprole(e.target.value)
                                      }
                                    />
                                    <Button
                                      onClick={() => updateNewUser(user.userId)}
                                      type="submit"
                                      color="primary"
                                      variant="bordered"
                                    >
                                      Save
                                    </Button>
                                  </ModalBody>
                                </>
                              )}
                            </ModalContent>
                          </Modal>

                          {/* Delete */}
                          <Tooltip color="danger" content="Delete">
                            <span
                              onClick={() => deleteUser(user.userId)}
                              className="text-lg text-danger cursor-pointer active:opacity-50"
                            >
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
            total={Math.ceil(users.length / usersPerPage)}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default ManageUser;
