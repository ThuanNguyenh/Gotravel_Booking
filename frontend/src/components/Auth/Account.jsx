import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../contexts/userAuthContext";
import { NotificationIcon } from "../../assets/NotificationIcon";

import {
  Button,
  Modal,
  ModalContent,
  useDisclosure,
  NavbarContent,
  NavbarItem,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Badge,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import Login from "./Login";
import { Link } from "react-router-dom";
import getDataFromLocalStorage from "../../contexts/getDataFromLocalStorage";
import { Alert } from "../Alert/Alert";

const Account = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop] = React.useState("blur");

  const userInfo = getDataFromLocalStorage("userInfo");

  const { logOut } = useUserAuth();

  useEffect(() => {
    // Đóng modal khi đăng nhập thành công
    if (userInfo) {
      onClose();
    }
  }, [userInfo, onClose]);

  const handleLogout = async () => {
    try {
      await logOut();
      Alert(2000, "Đăng xuất", "Thành công", "success", "OK");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      Alert(2000, "Đăng xuất", "Thất bại", "error", "OK");
    }
  };

  // scroll display
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {userInfo ? (
        <NavbarContent justify="end">
          {/* notification */}
          <NavbarItem>
            <Popover size="lg" placement="bottom-end">
              <Badge
                size="md"
                className="scale-85"
                content="2"
                shape="circle"
                color="danger"
              >
                <PopoverTrigger>
                  <Button
                    radius="full"
                    isIconOnly
                    aria-label="more than 99 notifications"
                    variant="bordered"
                    size="md"
                    className="scale-90"
                  >
                    {React.cloneElement(<NotificationIcon />, {
                      size: "20",
                      fill: isScrolled ? "#1E293B" : "white",
                    })}
                  </Button>
                </PopoverTrigger>
              </Badge>
              <PopoverContent>
                <div className="px-1 py-2 w-52">
                  <div className="text-small font-bold text-center">
                    Notification
                  </div>
                  <div className="text-tiny">
                    ➢ Notification 1 Notification 1 Notification 1
                  </div>
                  <div className="text-tiny">➢ Notification 2</div>
                </div>
              </PopoverContent>
            </Popover>
          </NavbarItem>
          {/* notification */}
          <NavbarItem>
            <Dropdown size="lg" placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  size="sm"
                  isBordered
                  as="button"
                  className="transition-transform transform scale-90"
                  src={userInfo.avatarUrl}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-7 gap-2">
                  <p className="font-semibold">
                    {userInfo.userName || userInfo.data.username}
                  </p>
                </DropdownItem>

                <DropdownItem color="warning">Upgrade to Host</DropdownItem>

                <DropdownItem as={Link} to={`/profile`} key="settings">
                  My Settings
                </DropdownItem>

                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={handleLogout}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              onPress={onOpen}
              radius="full"
              // variant="bordered"
              className="bg-gradient-to-tr from-cyan-300 to-blue-400 text-white text-md shadow-lg transform transition-transform hover:scale-110 delay-150 duration-300"
            >
              Đăng nhập
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}

      {/* modal */}
      <Modal
        className="drop-shadow-xl "
        backdrop={backdrop}
        isOpen={isOpen}
        onClose={onClose}
        hideCloseButton
      >
        <ModalContent className="container">
          <Login />
        </ModalContent>
      </Modal>

      {/* modal */}
    </>
  );
};

export default Account;
