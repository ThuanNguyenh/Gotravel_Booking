import { Avatar, Badge, Card, Image, Tab, Tabs, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button} from "@nextui-org/react"
import { Pen } from "../../assets/Pen"
import { SettingIcon } from "../../assets/SettingIcon";

import BookingHistory from "./BookHis";

import { useEffect, useState } from "react";

function Profile() {    

    
    const [users, setUsers] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("https://dummyjson.com/user/1");
          const data = await response.json();
          setUsers(data);
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      };
  
      fetchData();
    }, []);


    return(
        <div className="py-5 px-[10%]">
            <div >
                <div className="w-full relative">
                    <Card
                        shadow="none" 
                        className='flex items-center h-80'
                    >
                        <Image className="w-full bg-cover" src="https://via.placeholder.com/1280x262" />

                        <div className="absolute bottom-0 z-10 text-center">
                            <Badge isOneChar color="primary" placement="bottom-right" content={<Pen/>}>
                                <Avatar isBordered className="h-28 w-28" color="primary" src={users.image}/>
                            </Badge>
                            <h1 className="pt-2 text-lg font-semibold">{users.firstName}</h1>
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
                                            <TableCell>{users.firstName} {users.lastName}</TableCell>
                                            </TableRow>
                                            <TableRow key="2">
                                            <TableCell>Email</TableCell>
                                            <TableCell>{users.email}</TableCell>
                                            </TableRow>
                                            <TableRow key="3">
                                            <TableCell>Phone number</TableCell>
                                            <TableCell>{users.phone}</TableCell>
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
                                            <TableRow key="4">
                                            <TableCell>User</TableCell>
                                            <TableCell>{users.email}</TableCell>
                                            </TableRow>
                                            <TableRow key="5">
                                            <TableCell>Password</TableCell>
                                            <TableCell>{users.password}</TableCell>
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