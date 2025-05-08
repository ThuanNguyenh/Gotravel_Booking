import { Image } from "@nextui-org/react";

import TourSearch from "./TourSearch";

const SlideBanner = () => {
  return (
    <div className="mt-16 grid grid-cols-1 justify-center bg-gradient-to-b from-[#E3F7FC] to-[#fff]">
      <div className="w-5/6 mx-auto">
        <div className="flex justify-between items-center">
          <div className="md:text-[2em] text-[1em] font-semibold">
            <p>TourTrek, trải nghiệm cuộc sống muôn màu!</p>
            <p className="font-light text-[0.7em]">Lên ý tưởng cho trải nghiệm tuyệt vời!</p>
          </div>
          <div className="flex justify-center w-[50%] bg-cover bg-center bg-[url(./plan.png)]">
            <Image
              className="object-cover"
              width="400px"
              alt="NextUI hero Image with delay"
              src="./imageBanner.png"
            />
          </div>
        </div>

        <TourSearch />
      </div>
    </div>
  );
};

export default SlideBanner;
