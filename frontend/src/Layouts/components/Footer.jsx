
import { FacebookIcon } from "../../assets/FacebookIcon";
import { GoogleIcon } from "../../assets/GoogleIcon";
import { Twitter } from "../../assets/twitter";
import { Instagram } from "../../assets/insta";
// https://png.pngtree.com/background/20210706/original/pngtree-world-travel-picture-image_209351.jpg
// https://s3-alpha-sig.figma.com/img/da60/fd0c/c5810323f4c2ab996c4401f0e3d84e3a?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=W6ZLTtF-JOA9qN7aKGhEnO77h-UJ0Cq7wS7v7vUu1XoyMfUkTQPNDuciSd4fVmZyc14wmKVWOcDlt7jsILvcmCsbL~mpJjYAvgwJHVPdKFisB-L~PtnmoKi8Y5F-u2TRw-EiBWe~50gIkGToXBt3c3Dvv1McxA9cQFFMaugHqxykGwaepkEafosDpYLy63zALW-XylcHeEmDBmImTKGO6XxUode3VOmU35D9h8Z6q5yHKrvhv~dCmdXSJF2CNq2yctTScX3-0z0V528GXp3cqpNS2JZocv~BMjaTEcq9nR140Yh1F5ZOJuDazX7ZETi6ZYpCISGzOlXsgLi1ObetmQ__
const Footer = () => {
  return (
    <div className="pt-10">
      <div className="flex justify-center bg-cover h-48 bg-[url('https://www.huxtaburger.com.au/wp-content/themes/HUXTA/images/Navy_Footer.svg')]"/>
      
      <div className="flex justify-center text-center text-white bg-[#10233C]">
        <div className="flex flex-col p-10 gap-5">
          <div className="flex text-2xl font-semibold justify-center">
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