import { Avatar, Badge, Card, Image, Tab, Tabs, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button} from "@nextui-org/react"
import { Pen } from "../../assets/Pen"
import { SettingIcon } from "../../assets/SettingIcon";

import BookingHistory from "./BookHis";

import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {    

  const [users, setUsers] = useState([]);

  // get userId from localStorage
  const userString = localStorage.getItem("userInfo");
  const user = JSON.parse(userString);
  const userId = user?.userId;

  // Get token from localStorage
  const token = localStorage.getItem("accessToken");

  // Get tour rating data
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
      setUsers(response.data);
      console.log("profile: ", response.data);
    } catch (error) {
      console.log("Error profile");
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

    return(
        <div className="py-5 px-[10%]">
            <div >
                <div className="w-full relative">
                    <Card
                        shadow="none" 
                        className='flex items-center h-64'
                    >
                        <Image className="w-full" src="https://upload.wikimedia.org/wikipedia/commons/f/fa/VancouverSkyline.jpg" />

                        <div className="absolute bottom-3 z-10 text-center">
                            <Badge isOneChar color="primary" placement="bottom-right" content={<Pen/>}>
                                <Avatar isBordered className="h-28 w-28" color="primary" src={users.avatar}/>
                            </Badge>
                            <h1 className="pt-2 text-lg font-semibold">{users.userName}</h1>
                            <p>{users.university}</p>
                        </div>

                    </Card>
                </div>
            </div>
            <div className="gap-5">
                    <Tabs>
                        <Tab title="Profile">
                            <div className="flex flex-col gap-10">
                                <Card>       
                                    <div>
                                        <div className="flex justify-between pt-4 px-7 ">
                                            <h1 className="text-2xl font-semibold">Profile</h1>
                                            <Button variant="light" className="text-blue-400"><SettingIcon/>Edit Profile</Button>
                                        </div>
                                        <Table layout="fixed" hideHeader>
                                        <TableHeader>
                                            <TableColumn>Q</TableColumn>
                                            <TableColumn>A</TableColumn>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow key="1">
                                            <TableCell>Name</TableCell>
                                            <TableCell>{users.userName}</TableCell>
                                            </TableRow>
                                            <TableRow key="2">
                                            <TableCell>Email</TableCell>
                                            <TableCell>{users.email}</TableCell>
                                            </TableRow>
                                            <TableRow key="3">
                                            <TableCell>Phone number</TableCell>
                                            <TableCell>{users.phone}</TableCell>
                                            </TableRow>
                                            <TableRow key="4">
                                            <TableCell>Role</TableCell>
                                            <TableCell>{users.roles}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                        </Table>
                                    </div>
                                </Card>

                                <Card>
                                    <div className="pt-5">
                                        <div className="flex justify-between  px-7 ">
                                            <h1 className="text-2xl font-semibold">Login Information</h1>
                                            <Button variant="light" className="text-blue-400"><SettingIcon/>Edit Password</Button>
                                        </div>
                                        <Table layout="fixed" hideHeader>
                                        <TableHeader>
                                            <TableColumn>Q</TableColumn>
                                            <TableColumn>A</TableColumn>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow key="5">
                                            <TableCell>User</TableCell>
                                            <TableCell>{users.email}</TableCell>
                                            </TableRow>
                                            <TableRow key="6">
                                            <TableCell>Password</TableCell>
                                            <TableCell>*******</TableCell>
                                            </TableRow>
                                        </TableBody>
                                        </Table>
                                    </div>
                                </Card>
                            </div>
                        </Tab>

                        <Tab title="Booking History">
                            <BookingHistory/>
                        </Tab>
                    </Tabs>
            </div>
        </div>
    )
}


export default Profile