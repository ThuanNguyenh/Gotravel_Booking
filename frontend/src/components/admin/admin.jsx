/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import {Listbox, ListboxItem} from "@nextui-org/react";
import { MenuIcon } from '../../assets/menuIcon';
import { HotelIcon } from '../../assets/HotelIcon';
import { ChartIcon } from '../../assets/chartIcon';
import { NotificationIcon } from '../../assets/NotificationIcon';

import AdminDashBoard from './adDashBoard';
import ManageUser from './manageUser';
import ManageRevenueAd from './manageRevenueAd';
import Request from './requestToHost';


const Admin = ({ children }) => {
  const [selectedContent, setSelectedContent] = useState('DashBoard');

  const handleLinkClick = (content) => {
    setSelectedContent(content);
  };

  let contentComponent;
  switch (selectedContent) {
    case "DashBoard":
      contentComponent = <AdminDashBoard />;
      break;
    case "ManageUser":
      contentComponent = <ManageUser />;
      break;
    case "ManageRevenue":
      contentComponent = <ManageRevenueAd />;
      break;
    case "Request":
      contentComponent = <Request />;
      break;
    default:
      contentComponent = null;
  }

  return (
    <div className="flex">
      <div className="h-full w-56 fixed left-0 top-16 bottom-0 ">
        <div className="flex flex-col h-full justify-center items-center">
          <div className="flex-1 overflow-y-auto w-full max-w-[260px]  text-center py-2">

              <Listbox  shouldHighlightOnFocus className='text-xl font-bold'>

                <ListboxItem startContent={<MenuIcon/>} onClick={() => handleLinkClick('DashBoard')}>Thống Kê</ListboxItem>
                <ListboxItem startContent={<HotelIcon/>} onClick={() => handleLinkClick('ManageUser')}>Quản Lý Người Dùng </ListboxItem>
                 {/* <ListboxItem startContent={<ChartIcon/>} onClick={() => handleLinkClick('ManageRevenue')}>Revenue</ListboxItem> */}
                <ListboxItem startContent={<NotificationIcon/>} onClick={() => handleLinkClick('Request')}>Yêu Cầu Cấp Quyền</ListboxItem>



              </Listbox>

          </div>
        </div>
      </div>
      <div className="w-full pl-28">
        <div className="p-8">
          {contentComponent}
        </div>
      </div>
    </div>
  );
};

export default Admin;
