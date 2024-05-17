import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function TourDetailDes() {

  //fetch des
  const { tourId } = useParams();
  const [des, setDes] = useState('');

  // get token from localStorage
  const token = localStorage.getItem("accessToken");

  // get data tour
  const getDes = async () => {
    try {
      if (!token) {
        return;
      }

      // Thêm token vào tiêu đề "Authorization"
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `http://localhost:8080/api/v1/tour/${tourId}`,
        config
      );
      setDes(response.data);
    } catch (error) {
      console.log("Error")
    }
  };

  useEffect(() => {
    getDes();
  },);

  return (
    <div className="w-full flex-col ">
      {/* description */}
      <div className="py-3">
        {des.description}
      </div>

      <div className="">
        <div className="font-semibold text-xl">Tiện ích</div>
        <div className="w-1/5">
          <div className="grid-rows-2 gap-2">
            {des?.utilities.map((item, index) => (
              <div
                key={index}
                className="transition-aorder bg-gray-300 text-gray-600 inline-flex h-8 items-center text-sm px-2 m-1 rounded-full"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourDetailDes