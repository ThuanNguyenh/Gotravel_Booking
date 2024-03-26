import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Divider,
  Dropdown,
  DropdownItem,
  Button,
  DropdownMenu,
} from "@nextui-org/react";

import "./style.scss";
import Account from "../../components/Auth/Account";
// import SlideBanner from "../../components/SlideBanner/SlideBanner";
import Language from "../../components/menu/language";
import { ChevronDownIcon } from "../../assets/ChevronDownIcon ";
import { TourIcon } from "../../assets/TourIcon";
import { HotelIcon } from "../../assets/HotelIcon";
import { CarIcon } from "../../assets/CarIcon";

export default function App() {
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

  // menu open ui phone
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // const [id, setId] = useState(1);

  const ListsId = [
    { id: 1, page: "Trang chủ", linkPage: "/" },
    {
      id: 2,
      page: "Khám phá",
      icon: <ChevronDownIcon />,
      subpages: [
        { id: 1, item: "Tour", link: "/list-tour", icon: <TourIcon /> },
        { id: 2, item: "Khách sạn", link: "/", icon: <HotelIcon /> },
        { id: 3, item: "Xe", link: "/", icon: <CarIcon /> },
      ],
    },
    { id: 3, page: "Hợp tác", linkPage: "" },
    { id: 4, page: "Hỗ trợ", linkPage: "" },
  ];

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  // hover: open or close dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleNavbarItemHover = () => {
    setIsDropdownOpen(true);
  };

  const handleNavbarItemLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <>
      {/* <Navbar/> */}
      <Navbar
        className={`nav mx-auto absolute z-50 fixed ${
          isScrolled
            ? "border-b-1"
            : "bg-gradient-to-r from-cyan-500 to-[#73D8FC]"
        } `}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        {/* logo sm */}
        <NavbarContent className="sm:hidden pr-3" justify="center">
          <Link to="/">
            <NavbarBrand>
              <img
                src={isScrolled ? "./Logo.png" : "./Logo1.png"}
                className="me-2 w-6"
              />
              <p
                className={`font-bold ${
                  isScrolled ? "text-[#00AFE1]" : "text-white"
                } `}
              >
                gotravel
              </p>
            </NavbarBrand>
          </Link>
        </NavbarContent>

        {/* logo xl */}
        <NavbarContent className="hidden sm:flex gap-8" justify="start">
          <Link to="/">
            <NavbarBrand>
              <img
                src={isScrolled ? "./Logo.png" : "./Logo1.png"}
                className="me-2 w-8"
              />
              <p
                className={`font-bold text-xl ${
                  isScrolled ? "text-[#00AFE1]" : "text-white"
                } `}
              >
                Gotravel
              </p>
            </NavbarBrand>
          </Link>
        </NavbarContent>

        {/* menu phải*/}

        <NavbarContent justify="end" className="modal-account font-semibold">
          {/* menu */}
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            {ListsId.map((index) => (
              <NavbarItem key={index.id}>
                <div className="flex h-5 items-center space-x-4">
                  {index.subpages ? (
                    <Dropdown>
                      <NavbarItem
                        onMouseEnter={handleNavbarItemHover}
                        onMouseLeave={handleNavbarItemLeave}
                      >
                        <Button
                          disableRipple
                          className={`p-0 bg-transparent data-[hover=true]:bg-transparent ${
                            isScrolled ? "text-slate-800" : "text-white"
                          } font-semibold text-md`}
                          endContent={index.icon}
                          radius="sm"
                          variant="light"
                        >
                          {index.page}
                        </Button>
                        {isDropdownOpen && (
                          <DropdownMenu>
                            {index.subpages.map((item) => (
                              <DropdownItem key={item.id}>
                                <Link
                                  to={item.link}
                                  className=" text-slate-500"
                                >
                                  <div className="flex items-center">
                                    <span className="pl-2 pr-4">
                                      {React.cloneElement(item.icon, {
                                        fill: "#64748b",
                                      })}
                                    </span>
                                    {item.item}
                                  </div>
                                </Link>
                              </DropdownItem>
                            ))}
                          </DropdownMenu>
                        )}
                      </NavbarItem>
                    </Dropdown>
                  ) : (
                    <Link
                      // onClick={() => setId(index.id)}
                      to={index.linkPage}
                      className={`${
                        isScrolled ? "text-slate-800" : "text-white"
                      } hover:text-slate-500 `}
                    >
                      {index.page}
                    </Link>
                  )}

                  <Divider orientation="vertical" />
                </div>
              </NavbarItem>
            ))}
          </NavbarContent>

          {/* menu */}

          <NavbarItem
            className={`${isScrolled ? "text-slate-800" : "text-white"}`}
          >
            <Language />
          </NavbarItem>
          <NavbarItem>
            <Account />
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={
                  index === 2
                    ? "warning"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                to="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  );
}
