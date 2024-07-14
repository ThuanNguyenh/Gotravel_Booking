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
    { id: 2, page: "Tour bán chạy", percentage: 35 },
    { id: 3, page: "Chủ đề", percentage: 75 },
    { id: 4, page: "Liên hệ", percentage: 100 },
  ];

  return (
    <Navbar
      className={`nav mx-auto z-50 fixed ${
        isScrolled
          ? "border-b-1"
          : "bg-[#E3F7FC]"
      }`}
    >
      {/* mobile */}
      <NavbarContent className="sm:hidden pr-3" justify="center">
        <Link to="/">
          <NavbarBrand>
            <img
              src="/Logo.png"
              className="me-2 w-8"
            />
            <p
              className={`font-[600] text-2xl text-cyan-500
              }`}
            >
              TourTrek
            </p>
          </NavbarBrand>
        </Link>
      </NavbarContent>

      {/* desktop */}
      <NavbarContent className="hidden sm:flex gap-8" justify="start">
        <Link to="/">
          <NavbarBrand>
  
            <img src="/Logo.png" className="me-2 w-8" />
  
            <p className={`font-[600] text-2xl text-cyan-500`}>TourTrek</p>
          </NavbarBrand>
        </Link>
      </NavbarContent>

      <NavbarContent justify="end" className="modal-account font-semibold">
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {ListsId?.map((item) => (
            <NavbarItem key={item.id}>
              <div className="flex h-5 items-center space-x-2">
                <Button
                  as={Link}
                  to={item.linkPage}
                  onClick={() => scrollToPercentage(item.percentage)}
                  className={`text-[#333333] hover:text-slate-500 font-semibold text-md`}
                  style={{ background: "none", border: "none" }}
                >
                  {item.page}
                </Button>
                <Divider orientation="vertical" />
              </div>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarItem className={`text-[#333333]`}>
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
