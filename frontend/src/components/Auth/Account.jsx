import React, { useEffect, useRef, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import getDataFromLocalStorage from "../../contexts/getDataFromLocalStorage";
import { Alert } from "../Alert/Alert";

const Account = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop] = React.useState("blur");

  const [userInfo, setUserInfo] = useState(getDataFromLocalStorage("userInfo"));

  const [roles, setRoles] = useState(userInfo?.roles || []);

  // sử dụng useRef để giữ giá trị trước đó, để hạn chế re-render
  // const prevRolesRef = useRef();
  const loginButtonRef = useRef(null); // Ref for the login button

  const { logOut } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      setUserInfo(null);
      Alert(2000, "Đăng xuất", "Thành công", "success", "OK");
      navigate("/");
    } catch (error) {
      Alert(2000, "Đăng xuất", "Thất bại", "error", "OK");
    }
  };

  // hiển thị thanh cuộn
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    // dọn sạch listener khi component bị unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (userInfo) {
      onClose();
    } else {
      if (loginButtonRef.current) {
        loginButtonRef.current.click();
      }
    }
  }, [userInfo, onClose]);

  useEffect(() => {
    setRoles(userInfo?.roles || []);
  }, [userInfo]);

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

                {roles?.includes("ROLE_USER") && (
                  <DropdownItem as={Link} to={`#`}>
                    Đăng ký tour của bạn
                  </DropdownItem>
                )}

                {roles?.includes("ROLE_HOST") && (
                  <DropdownItem as={Link} to={`/host`}>
                    Trang quản lý
                  </DropdownItem>
                )}

                <DropdownItem as={Link} to={`/profile`} key="settings">
                  Tài khoản của tôi
                </DropdownItem>

                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              // ref={loginButtonRef} // Assign ref to the login button
              onPress={onOpen}
              radius="full"
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
          <Login setUserInfo={setUserInfo}/>
        </ModalContent>
      </Modal>
      {/* modal */}
    </>
  );
};

export default Account;
