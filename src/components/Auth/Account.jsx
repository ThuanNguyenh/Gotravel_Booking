import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useUserAuth } from "../../contexts/userAuthContext";

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

  return (
    <>
      {isLoggedIn ? (
        <NavbarContent justify="end">
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform transform scale-75"
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
              variant="bordered"
              className="bg-gradient-to-tr from-green-400 to-blue-500 text-white font-medium shadow-lg transform transition-transform hover:scale-110 delay-150 duration-300"
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
