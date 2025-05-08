import { Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { FaAngleUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    showScrollButton && (
      <div className="flex justify-end">
        <Button
          onClick={scrollToTop}
          isIconOnly
          variant="flat"
          className="bg-gradient-to-tl fixed text-white to-[#73D8FC] from-cyan-500"
          size="sm"
          style={{
            right: "40px",
            bottom: "40px",
            cursor: "pointer",
          }}
          radius="full"
        >
          <FaAngleUp size={24} />
        </Button>
      </div>
    )
  );
};

export default ScrollToTopButton;
