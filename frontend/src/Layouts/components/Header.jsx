import { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Divider,
  Button,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import "./style.scss";
import Account from "../../components/Auth/Account";
import Language from "../../components/menu/language";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToPercentage = (percentage) => {
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const targetScrollY = (documentHeight - windowHeight) * (percentage / 100);
    window.scrollTo({ top: targetScrollY, behavior: "smooth" });
  };

  const ListsId = [
    { id: 1, page: "Trang chủ", linkPage: "/" },
    { id: 2, page: "Tour Hàng Đầu", percentage: 35 },
    { id: 3, page: " Tour", percentage: 75 },
    { id: 4, page: "Liên hệ", percentage: 100 },
  ];

  return (
    <Navbar
      className={`nav mx-auto z-50 fixed ${
        isScrolled ? "border-b-1" : "bg-gradient-to-r from-cyan-500 to-[#73D8FC]"
      }`}
    >
      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <img
            src={isScrolled ? "/Logo.png" : "/Logo1.png"}
            className="me-2 w-6"
          />
          <p
            className={`font-bold ${
              isScrolled ? "text-[#00AFE1]" : "text-white"
            }`}
          >
            Gotravel
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-8" justify="start">
        <NavbarBrand>
          <img
            src={isScrolled ? "/Logo.png" : "/Logo1.png"}
            className="me-2 w-8"
          />
          <p
            className={`font-bold text-xl ${
              isScrolled ? "text-[#00AFE1]" : "text-white"
            }`}
          >
            Gotravel
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end" className="modal-account font-semibold">
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {ListsId.map((item) => (
            <NavbarItem key={item.id}>
              <div className="flex h-5 items-center space-x-2">
                <Button
                  as={Link}
                  to={item.linkPage}
                  onClick={() => scrollToPercentage(item.percentage)}
                  className={`${
                    isScrolled ? "text-slate-800" : "text-white"
                  } hover:text-slate-500 font-semibold text-lg`}
                  style={{ background: "none", border: "none" }}
                >
                  {item.page}
                </Button>
                <Divider orientation="vertical" />
              </div>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarItem className={`${isScrolled ? "text-slate-800" : "text-white"}`}>
          <Language />
        </NavbarItem>
        <NavbarItem>
          <Account />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default Header;
