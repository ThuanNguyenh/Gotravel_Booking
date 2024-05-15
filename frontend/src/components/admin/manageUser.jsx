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


function ManageUser() {

    const updateUser = useDisclosure();
    const createUser = useDisclosure();


    const roleColorMap = {
        User: "success",
        Host: "primary",
      };
    
      const roleOptions = [
        { name: "Host", uid: "host" },
        { name: "User", uid: "user" },
      ];
    
      const users = [
        { id: 1, name: "Alex", role: "Host" },
        { id: 2, name: "Anh", role: "User" },
        { id: 3, name: "John", role: "User" },
        { id: 4, name: "Emily", role: "Host" },
        { id: 5, name: "David", role: "User" },
        { id: 6, name: "Sarah", role: "Host" },
        { id: 7, name: "Michael", role: "User" },
        { id: 8, name: "Emma", role: "Host" },
        { id: 9, name: "William", role: "User" },
        { id: 10, name: "Sophia", role: "Host" },
        { id: 11, name: "Daniel", role: "User" },
        { id: 12, name: "Olivia", role: "Host" },
        { id: 13, name: "Matthew", role: "User" },
        { id: 14, name: "Ava", role: "Host" },
        { id: 15, name: "Ethan", role: "User" },
        { id: 16, name: "Isabella", role: "Host" }
      ];

      // Pagination state
      const [currentPage, setCurrentPage] = useState(1);
      const usersPerPage = 5;
    
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
        const matchesSearchQuery = user.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRoleFilter =
          selectedRoleFilters.length === 0 || selectedRoleFilters.includes(user.role);
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
                      {selectedRoleFilters.length > 0 ? selectedRoleFilters.join(', ') : 'Role'} 
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
    
                <Button color="primary" endContent={<PlusIcon />}>
                  Add New
                </Button>

              </div>
            </div>
    
            <div>
              <Table layout="fixed" aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn>NAME</TableColumn>
                  <TableColumn>ROLE</TableColumn>
                  <TableColumn>ACTION</TableColumn>
                </TableHeader>
                <TableBody>
                  {/* Map over the data to render each row dynamically */}
                  {filteredUsers.map((user) => {
                    if (isUserVisible(user)) {
                      return (
                        <TableRow key={user.id}>
                          <TableCell>{user.name}</TableCell>
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
                                  {(onClose) => 
                                    (
                                      <>
                                      <ModalHeader className="px-5 justify-center text-xl">Update User</ModalHeader>
                                      <ModalBody className="px-5 pb-5">
                                        <Input
                                          label="Name"
                                          placeholder={user.name}
                                          variant="bordered"
                                        />
                                        <Input
                                          label="Role (Host or User)"
                                          placeholder={user.role}
                                          variant="bordered"
                                        />
                                        <Button type="submit" color="primary" variant="bordered">Save</Button>
                                      </ModalBody>
                                      </>
                                    )
                                  }
                                </ModalContent>
                              </Modal>
    
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
              total={Math.ceil(users.length / usersPerPage)}
              onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      );
}

export default ManageUser;