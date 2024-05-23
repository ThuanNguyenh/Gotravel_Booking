import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function TourDetailDes() {
  // Fetch tour detail based on id
  const { tourId } = useParams();
  const [dataTour, setDataTour] = useState(null);

  // Get token from localStorage
  const token = localStorage.getItem("accessToken");

  // Get data tour
  const getDataTour = async () => {
    try {
      if (!token) {
        return;
      }

      // Add token to "Authorization" header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `http://localhost:8080/api/v1/tour/${tourId}`,
        config
      );
      setDataTour(response.data);
      console.log("Tour details: ", response.data);
    } catch (error) {
      console.log("Error fetching tour data:", error);
    }
  };

  useEffect(() => {
    getDataTour();
  }, [tourId]); // Adding tourId as a dependency ensures the effect runs when tourId changes

  if (!dataTour) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex-col">
      {/* Tour Description */}
      <div className="p-3 text-md">
        <p>Tour bắt đầu từ {dataTour.startDate} đến {dataTour.endDate}</p> 
        <p>{dataTour.description}</p>
      </div>

      <div className="py-3 w-1/3">
          <div className="font-semibold text-xl">Lịch trình</div>
          <div className="w-full">
            <div className="p-2">
              {dataTour.schedules && dataTour.schedules.map((schedule, index) => (
                <div key={index} className="">
                  {schedule.date} - {schedule.activities.map((activity, idx) => (
                    <span key={idx}>{activity.context}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

      <div className="flex w-full justify-between">
        <div className="w-1/3 py-3">
          <div className="font-semibold text-xl">Danh mục</div>
          <div className="w-full">
            <div className="grid grid-cols-3 gap-5">
              {dataTour.categories && dataTour.categories.map((category, index) => (
                <div
                  key={index}
                  className="transition-aorder bg-gray-300 text-gray-600 inline-flex h-8 items-center justify-center text-sm px-2 m-1 rounded-full"
                >
                  {category.categoryName}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="py-3 pr-10 w-1/3">
          <div className="font-semibold text-xl">Tiện ích</div>
          <div className="w-full">
            <div className="grid grid-cols-2 gap-5">
              {dataTour.utilities && dataTour.utilities.map((utility, index) => (
                <div
                  key={index}
                  className="transition-aorder bg-gray-300 text-gray-600 inline-flex h-8 items-center justify-center text-sm px-2 m-1 rounded-full"
                >
                  {utility.utilityName}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="py-3">
        <div className="font-semibold text-xl">Yêu cầu</div>
        <div className="w-full">
          <div className="grid grid-cols-5 gap-5">
            {dataTour.rules && dataTour.rules.map((rule, index) => (
              <div
                key={index}
                className="transition-aorder bg-gray-300 text-gray-600 inline-flex h-8 items-center justify-center text-sm px-2 m-1 rounded-full"
              >
                {rule.ruleName}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourDetailDes;
