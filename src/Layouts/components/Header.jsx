import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Tabs,
  Tab,
} from "@nextui-org/react";

import "./style.scss";
import Account from "../../components/Auth/Account";
import SlideBanner from "../../components/SlideBanner/SlideBanner";
import Language from "../../components/menu/language";

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
  const ListsId = [
    { id: 1, page: "khám phá" },
    { id: 2, page: "Hợp tác" },
    { id: 3, page: "Hỗ trợ" },
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
          isScrolled ? "" : "bg-gradient-to-r from-cyan-500 to-blue-500"
        } `}
        // isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <Link href="/">
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
          <Link href="/">
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

        <NavbarContent
          justify="end"
          className="modal-account font-semibold"
        >
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
                  } text-zinc-700 group-data-[selected=false]`,
                }}
              >
                {ListsId.map((key) => (
                  <Tab key={key.id} title={key.page} />
                ))}
              </Tabs>
            </div>
          </NavbarContent>

          {/* menu */}

          {/* modal đăng nhập */}
          <NavbarItem
            className={`language-item ${
              isScrolled ? "text-zinc-700" : "text-white"
            } `}
          >
            <Language />
          </NavbarItem>
          <NavbarItem>
            <Account />
          </NavbarItem>
        </NavbarContent>
        {/* modal đăng nhập */}

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
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

      <SlideBanner />
    </>
  );
}
