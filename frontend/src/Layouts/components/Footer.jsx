
import { FacebookIcon } from "../../assets/FacebookIcon";
import { GoogleIcon } from "../../assets/GoogleIcon";
import { Twitter } from "../../assets/twitter";
import { Instagram } from "../../assets/insta";



const Footer = () => {



  return (
    <div className="pt-10">
      <div className="flex justify-center bg-cover h-48 bg-[url('https://www.huxtaburger.com.au/wp-content/themes/HUXTA/images/Navy_Footer.svg')]"/>
      
      <div className="flex justify-center text-center text-white bg-[#10233C]">
        <div className="flex flex-col p-10 gap-5">
          <div className="flex flex-col text-2xl font-semibold justify-center">

            <h1>Xách balo lên và đi ngay thôi !</h1>
          </div>
          <div className="flex justify-center">
            <button className="bn">Book Now !</button>
          </div>
          <div className="flex flex-row gap-5 justify-center">
            <FacebookIcon/>
            <Twitter/>
            <Instagram/>
            <GoogleIcon/>
          </div>
          <div>
            <p>Copyright © 2024 - All Rights Reserved - LNA</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer