/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import ManageTour from './manageTour/manageTour';
import ManageRevenue from './manageRevenue/manageRevenue';
import DashBoard from './dashBoard';
import RequestBooking from './manageTour/requestBooking';

import { useState } from 'react';
import {Listbox, ListboxItem} from "@nextui-org/react";
import { MenuIcon } from '../../assets/menuIcon';
import { HotelIcon } from '../../assets/HotelIcon';
import { ChartIcon } from '../../assets/chartIcon';
import { RequestIcon } from '../../assets/requestIcon';
import NewTourForm from './manageTour/newTour';
import UpdateTourForm from './manageTour/updateTour';


const Host = ({ children }) => {
  const [selectedContent, setSelectedContent] = useState('DashBoard');

  const handleLinkClick = (content) => {
    setSelectedContent(content);
  };

  return (
    <div className="flex">
      <div className="h-full w-56 fixed left-0 top-16 bottom-0 ">
        <div className="flex flex-col h-full justify-center items-center">
          <div className="flex-1 overflow-y-auto w-full max-w-[260px]  text-center py-2">
            <Listbox shouldHighlightOnFocus className='text-xl font-bold'>
              <ListboxItem startContent={<MenuIcon />} onClick={() => handleLinkClick('DashBoard')}>Dashboard</ListboxItem>
              <ListboxItem startContent={<HotelIcon />} onClick={() => handleLinkClick('ManageTour')}>Your Tour</ListboxItem>
              <ListboxItem startContent={<ChartIcon />} onClick={() => handleLinkClick('ManageRevenue')}>Revenue</ListboxItem>
              <ListboxItem startContent={<RequestIcon />} onClick={() => handleLinkClick('RequestBooking')}>Booking</ListboxItem>
            </Listbox>
          </div>
        </div>
      </div>
      <div className="w-full pl-28">
        <div className="px-8">
          {selectedContent === 'DashBoard' && <DashBoard />}
          {selectedContent === 'ManageTour' && <ManageTour handleLinkClick={handleLinkClick} />}
          {selectedContent === 'ManageRevenue' && <ManageRevenue />}
          {selectedContent === 'RequestBooking' && <RequestBooking />}
          {selectedContent === 'NewTour' && <NewTourForm />}
          {selectedContent === 'UpdateTour' && <UpdateTourForm />}
        </div>
      </div>
    </div>
  );
};

export default Host;