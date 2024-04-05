/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import ManageTour from './manageTour/manageTour';
import ManageRevenue from './manageRevenue/manageRevenue';
import DashBoard from './dashBoard';

import { useState } from 'react';
import {Listbox, ListboxItem} from "@nextui-org/react";
import { MenuIcon } from '../../assets/menuIcon';
import { HotelIcon } from '../../assets/HotelIcon';
import { ChartIcon } from '../../assets/chartIcon';


const Host = ({ children }) => {
  // State to manage the content to be displayed
  const [selectedContent, setSelectedContent] = useState(ManageRevenue);

  // Function to handle clicking on a link
  const handleLinkClick = (contentComponent) => {
    setSelectedContent(contentComponent);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className=" h-full w-56 fixed left-0 top-16 bottom-0">
        {/* Sidebar content */}
        <div className="flex flex-col h-full justify-center items-center">
        
          {/* Sidebar links */}
          <div className="flex-1 overflow-y-auto w-full max-w-[260px] border-small text-center py-2 rounded-small border-default-200 dark:border-default-100">
              <Listbox className='text-xl font-bold'>
{/* FIX sidebar component cant use hook   */}
                <ListboxItem startContent={<MenuIcon/>} onClick={() => handleLinkClick(DashBoard)}>Dashboard</ListboxItem>
                <ListboxItem startContent={<HotelIcon/>} onClick={() => handleLinkClick(ManageTour)}>Your Tour</ListboxItem>
                <ListboxItem startContent={<ChartIcon/>} onClick={() => handleLinkClick(ManageRevenue)}>Revenue</ListboxItem>
                <ListboxItem startContent={<HotelIcon/>} href='/host/addTour'>Your Tour</ListboxItem>

              </Listbox>
          </div>
        </div>
      </div>
      {/* Main content */}
      <div className="w-5/6 pl-28">
        <div className="p-8">
          {/* Render the selected content component */}
          {selectedContent}
        </div>
      </div>
    </div>
  );
};

export default Host;
