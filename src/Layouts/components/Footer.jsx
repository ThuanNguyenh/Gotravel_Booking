import {Button} from "@nextui-org/react";
import { FacebookIcon } from "../../assets/FacebookIcon";
import { GoogleIcon } from "../../assets/GoogleIcon";
import { Twitter } from "../../assets/twitter";
import { Instagram } from "../../assets/insta";

const Footer = () => {
  return (
    <div className="pt-10">
      <div className="flex justify-center bg-[url('https://png.pngtree.com/background/20210706/original/pngtree-world-travel-picture-image_209351.jpg')] h-fit text-blue-400">
        <div className="flex flex-col p-10 gap-5">
          <div className="flex text-2xl font-semibold justify-center">
            <h1>Xách balo lên và đi ngay thôi !</h1>
          </div>
          <div className="flex justify-center">
            <Button radius="full" size="lg" className="bg-gradient-to-tr from-blue-400 to-teal-300 text-white shadow-lg">
              Book Now
            </Button>
          </div>
          <div className="flex flex-row gap-5 justify-center">
            <FacebookIcon/>
            <Twitter/>
            <Instagram/>
            <GoogleIcon/>
          </div>
          <div className="flex text-black ">
            <p>Copyright © 2024 - All Rights Reserved - Domain Name</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer