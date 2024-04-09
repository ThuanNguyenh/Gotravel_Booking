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
  const [selectedContent, setSelectedContent] = useState('DashBoard');

  const handleLinkClick = (content) => {
    setSelectedContent(content);
  };

  let contentComponent;
  switch (selectedContent) {
    case 'DashBoard':
      contentComponent = <DashBoard/>;
      break;
    case 'ManageTour':
      contentComponent = <ManageTour/>;
      break;
    case 'ManageRevenue':
      contentComponent = <ManageRevenue/>;
      break;
    default:
      contentComponent = null;
  }

  return (
    <div className="flex">
      <div className="h-full w-56 fixed left-0 top-16 bottom-0 ">
        <div className="flex flex-col h-full justify-center items-center">
          <div className="flex-1 overflow-y-auto w-full max-w-[260px] border-small text-center py-2 rounded-small border-default-200 dark:border-default-100">

              <Listbox className='text-xl font-bold'>

                <ListboxItem startContent={<MenuIcon/>} onClick={() => handleLinkClick('DashBoard')}>Dashboard</ListboxItem>
                <ListboxItem startContent={<HotelIcon/>} onClick={() => handleLinkClick('ManageTour')}>Your Tour</ListboxItem>
                <ListboxItem startContent={<ChartIcon/>} onClick={() => handleLinkClick('ManageRevenue')}>Revenue</ListboxItem>


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

export default Host;
