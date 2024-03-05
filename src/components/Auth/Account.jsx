import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useUserAuth } from "../../contexts/userAuthContext";
import { NotificationIcon } from "../../assets/NotificationIcon";

import {
  Button,
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  NavbarContent,
  NavbarItem,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Badge,
} from "@nextui-org/react";
import Login from "./Login";

const Account = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop] = React.useState("blur");

  const userRedux = useSelector((state) => state.user.userData);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const { logOut } = useUserAuth();

  useEffect(() => {
    // Đóng modal khi đăng nhập thành công
    if (isLoggedIn) {
      onClose();
    }
  }, [isLoggedIn, onClose]);

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      alert("Lỗi!");
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
      {isLoggedIn ? (
        <NavbarContent justify="end">
          {/* notification */}
          <NavbarItem>
            <Badge size="md" className="scale-85" content="2" shape="circle" color="danger">
              <Button
                radius="full"
                isIconOnly
                aria-label="more than 99 notifications"
                variant="bordered"
                size="md"
                className="scale-90"
              >
               {React.cloneElement(<NotificationIcon/>, {
                size: "20",
                fill: isScrolled ? "#1E293B" : "white"
               })} 
                
              </Button>
            </Badge>
          </NavbarItem>
          {/* notification */}
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  size="sm"
                  isBordered
                  as="button"
                  className="transition-transform transform scale-90"
                  src={userRedux.avatarUrl}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-7 gap-2">
                  <p className="font-semibold">{userRedux.userName}</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>

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
        <ModalContent className="px-4">
          <>
            <ModalBody>
              <Login />
            </ModalBody>
          </>
        </ModalContent>
      </Modal>

      {/* modal */}
    </>
  );
};

export default Account;
