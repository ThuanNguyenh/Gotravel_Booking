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
  Tabs,
  Tab,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  Button,
  DropdownMenu,
} from "@nextui-org/react";

import "./style.scss";
import Account from "../../components/Auth/Account";
// import SlideBanner from "../../components/SlideBanner/SlideBanner";
import Language from "../../components/menu/language";
import { ChevronDownIcon } from "../../assets/ChevronDownIcon ";

export default function App() {
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

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  // const [id, setId] = React.useState();

  const ListsId = [
    { id: 1, page: "Trang chủ" },
    {
      id: 2,
      page: "Khám phá",
      icon: <ChevronDownIcon />,
      subpages: [
        { id: 1, item: "Tour", link: "/list-tour" },
        { id: 2, item: "Khách sạn", link: "" },
        { id: 3, item: "Xe", link: "" },
      ],
    },
    { id: 3, page: "Hợp tác" },
    { id: 4, page: "Hỗ trợ" },
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

  return (
    <>
      {/* <Navbar/> */}
      <Navbar
        className={`nav mx-auto absolute z-50 fixed ${
          isScrolled
            ? "border-b-1"
            : "bg-gradient-to-r from-cyan-500 to-blue-500"
        } `}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

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
                Gotravel
              </p>
            </NavbarBrand>
          </Link>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-8" justify="start">
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
                Gotravel
              </p>
            </NavbarBrand>
          </Link>
        </NavbarContent>

        {/* menu phải*/}

        <NavbarContent justify="end" className="modal-account font-semibold">
          {/* menu */}
          <NavbarContent className="menu">
            <div className="flex w-full flex-col">
              <Tabs
                aria-label="Options"
                variant="underlined"
                classNames={{
                  tabList: "gap-6 w-full relative rounded-none justify-end",
                  cursor: `w-full ${isScrolled ? "bg-[#00AFE1]" : "bg-white"}`,
                  tab: "max-w-fit px-0 ",
                  tabContent: `${
                    isScrolled
                      ? "group-data-[selected=true]:text-[#00AFE1] "
                      : "group-data-[selected=true]:text-white "
                  } text-current group-data-[selected=false]`,
                }}
              >
                {ListsId.map((index) => (
                  <Tab
                    key={index.id}
                    title={
                      index.subpages ? (
                        <Dropdown>
                          <NavbarItem>
                            <DropdownTrigger >
                              <Button
                                disableRipple
                                className="p-0 font-bold bg-transparent data-[hover=true]:bg-transparent"
                                // endContent={icons.chevron}
                                radius="sm"
                                variant="light"
                              >
                                {index.page} {index.icon}
                              </Button>
                            </DropdownTrigger>
                          </NavbarItem>
                          <DropdownMenu
                            className="w-[100px]"
                            itemClasses={{
                              base: "gap-4",
                            }}
                          >
                            {index.subpages.map((item) => (
                              <DropdownItem key={item.id}>
                                <Link to={item.link}>{item.item}</Link>
                              </DropdownItem>
                            ))}
                          </DropdownMenu>
                        </Dropdown>
                      ) : (
                        <div className="flex items-center">
                          {index.page} {index.icon}
                        </div>
                      )
                    }
                  >
                    {/* {index.subpages ? ( 
                      <DropdownMenu>
                        
                      </DropdownMenu>
                    ) : (
                      ""
                    )} */}
                  </Tab>
                ))}
              </Tabs>
            </div>
          </NavbarContent>

          {/* menu */}

          <NavbarItem className="text-current">
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
