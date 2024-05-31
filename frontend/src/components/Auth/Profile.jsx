import {
  Avatar,
  Badge,
  Card,
  Image,
  Tab,
  Tabs,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Modal,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Snippet,
} from "@nextui-org/react";
import { Pen } from "../../assets/Pen";
import { SettingIcon } from "../../assets/SettingIcon";

import BookingHistory from "./BookHis";

import { useEffect, useState } from "react";
import axios from "axios";
import { Alert } from "../Alert/Alert";

function Profile() {
  const [userUpdate, setUserUpdate] = useState({
    userName: "",
    email: "",
    phone: "",
  });

  // get userId from localStorage
  const userString = localStorage.getItem("userInfo");
  const user = JSON.parse(userString);
  const userId = user?.userId;

  // Get token from localStorage
  const token = localStorage.getItem("accessToken");

  // Get
  const getProfile = async () => {
    try {
      if (!token) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `http://localhost:8080/api/v1/user/${userId}`,
        config
      );
      setUserUpdate(response.data);
    } catch (error) {
      console.log("Error profile");
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const [message, setMessage] = useState(null);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserUpdate((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  // UPDATE USER

  const handleUpdate = async () => {
    try {
      if (!token) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `http://localhost:8080/api/v1/user/update/${userId}`,
        userUpdate,
        config
      );
      onOpenChange(false);

      const mes = response.data?.message;
      Alert(1500, "Cập nhật thông tin cá nhân", mes, "success");
      setMessage(null);
    } catch (error) {
      setMessage(error.response.data);
    }
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="py-5 px-[10%]">
        <div>
          <div className="w-full relative">
            <Card shadow="none" className="flex items-center h-64">
              <Image
                className="w-full"
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/VancouverSkyline.jpg"
              />

              <div className="absolute bottom-3 z-10 text-center">
                <Badge
                  isOneChar
                  color="primary"
                  placement="bottom-right"
                  content={<Pen />}
                >
                  <Avatar
                    isBordered
                    className="h-28 w-28"
                    color="primary"
                    src={userUpdate.avatar}
                  />
                </Badge>
                <h1 className="pt-2 text-lg font-semibold">
                  {userUpdate.userName}
                </h1>
                <p>{userUpdate.university}</p>
              </div>
            </Card>
          </div>
        </div>
        <div className="gap-5">
          <Tabs>
            <Tab title="Thông Tin Cá Nhân">
              <div className="flex flex-col gap-10">
                <Card>
                  <div>
                    <div className="flex justify-between pt-4 px-7 ">
                      <h1 className="text-2xl font-semibold">
                        Thông Tin Cá Nhân
                      </h1>
                      <Button
                        variant="light"
                        className="text-blue-400"
                        onPress={onOpen}
                      >
                        <SettingIcon />
                        Chỉnh sữa thông tin cá nhân
                      </Button>
                    </div>
                    <Table layout="fixed" hideHeader>
                      <TableHeader>
                        <TableColumn>Q</TableColumn>
                        <TableColumn>A</TableColumn>
                      </TableHeader>
                      <TableBody>
                        <TableRow key="1">
                          <TableCell>Tên</TableCell>
                          <TableCell>{userUpdate.userName}</TableCell>
                        </TableRow>
                        <TableRow key="2">
                          <TableCell>Email</TableCell>
                          <TableCell>{userUpdate.email}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                          <TableCell>Số Điện Thoại</TableCell>
                          <TableCell>{userUpdate.phone}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                          <TableCell>Quyền</TableCell>
                          <TableCell>{userUpdate.roles}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </Card>

                <Card>
                  <div className="pt-5">
                    <div className="flex justify-between  px-7 ">
                      <h1 className="text-2xl font-semibold">
                        Thông Tin Đăng Nhập
                      </h1>
                      <Button variant="light" className="text-blue-400">
                        <SettingIcon />
                        Sửa Mật Khẩu
                      </Button>
                    </div>
                    <Table layout="fixed" hideHeader>
                      <TableHeader>
                        <TableColumn>Q</TableColumn>
                        <TableColumn>A</TableColumn>
                      </TableHeader>
                      <TableBody>
                        <TableRow key="5">
                          <TableCell>Người dùng</TableCell>
                          <TableCell>{userUpdate.email}</TableCell>
                        </TableRow>
                        <TableRow key="6">
                          <TableCell>Mật Khẩu</TableCell>
                          <TableCell>*******</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </Card>
              </div>
            </Tab>

            <Tab title="Lịch Sử Đặt Tour">
              <BookingHistory />
            </Tab>
          </Tabs>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="p-5">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Chỉnh sửa thông tin cá nhân
              </ModalHeader>
              <ModalBody>
                {message && (
                  <Snippet
                    hideSymbol
                    hideCopyButton
                    color="danger"
                    className={`w-full flex justify-center`}
                  >
                    {message}
                  </Snippet>
                )}
                <Input
                  autoFocus
                  label="Tên"
                  placeholder="Vui lòng nhập tên người dùng"
                  variant="bordered"
                  value={userUpdate.userName}
                  required
                  onChange={handleChangeInput}
                  name="userName"
                />
                <Input
                  label="Email"
                  placeholder="Vui lòng điền thông tin người dùng"
                  variant="bordered"
                  value={userUpdate.email}
                  required
                  onChange={handleChangeInput}
                  name="email"
                />
                <Input
                  label="Số điện thoại"
                  placeholder="Vui lòng nhập số điện thoại"
                  type="text"
                  variant="bordered"
                  value={userUpdate.phone}
                  onChange={handleChangeInput}
                  name="phone"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Hủy
                </Button>
                <Button
                  color="primary"
                  onPress={async () => {
                    await handleUpdate();
                  }}
                >
                  Lưu thay đổi
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Profile;
