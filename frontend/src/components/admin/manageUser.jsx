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
} from "@nextui-org/react";
  
  import { Pen } from "../../assets/Pen";
  import { DeleteIcon } from "../../assets/DeleteIcon";
  import { SearchIcon } from "../../assets/SearchIcon";
  import { ChevronDownIcon } from "../../assets/ChevronDownIcon ";
  import { PlusIcon } from "../../assets/PlusIcon";
  import { useState } from "react";


function ManageUser() {


    const statusColorMap = {
        User: "success",
        Host: "primary",
      };
    
      const statusOptions = [
        { name: "Host", uid: "host" },
        { name: "User", uid: "user" },
      ];
    
      const users = [
        { id: 1, name: "Alex", status: "Host" },
        { id: 2, name: "Anh", status: "User" },
        { id: 3, name: "John", status: "User" },
        { id: 4, name: "Emily", status: "Host" },
        { id: 5, name: "David", status: "User" },
        { id: 6, name: "Sarah", status: "Host" },
        { id: 7, name: "Michael", status: "User" },
        { id: 8, name: "Emma", status: "Host" },
        { id: 9, name: "William", status: "User" },
        { id: 10, name: "Sophia", status: "Host" },
        { id: 11, name: "Daniel", status: "User" },
        { id: 12, name: "Olivia", status: "Host" },
        { id: 13, name: "Matthew", status: "User" },
        { id: 14, name: "Ava", status: "Host" },
        { id: 15, name: "Ethan", status: "User" },
        { id: 16, name: "Isabella", status: "Host" }
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
    
      //filter status
      const [selectedStatusFilters, setSelectedStatusFilters] = useState([]);
      const toggleStatusFilter = (status) => {
        if (selectedStatusFilters.includes(status)) {
          setSelectedStatusFilters(selectedStatusFilters.filter((s) => s !== status));
        } else {
          setSelectedStatusFilters([...selectedStatusFilters, status]);
        }
      };
      const isUserVisible = (user) => {
        const matchesSearchQuery = user.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatusFilter =
          selectedStatusFilters.length === 0 || selectedStatusFilters.includes(user.status);
        return matchesSearchQuery && matchesStatusFilter;
      };
    
      // Filter users based on the search query
      const filteredUsers = currentUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (selectedStatusFilters.length === 0 ||
            selectedStatusFilters.includes(user.status))
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
                              color={statusColorMap[user.status]}
                              size="sm"
                              variant="flat"
                            >
                              {user.status}
                            </Chip>
                          </TableCell>
                          <TableCell>
                            <div className="relative flex items-center gap-4">
    
    {/* Update */}
                              <Tooltip content="Edit">
                                <span
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
              total={Math.ceil(users.length / usersPerPage)}
              onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      );
}

export default ManageUser;