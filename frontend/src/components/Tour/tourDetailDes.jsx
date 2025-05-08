import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function TourDetailDes() {
  // Fetch tour detail based on id
  const { tourId } = useParams();
  const [dataTour, setDataTour] = useState(null);

  // Get data tour
  const getDataTour = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/tour/${tourId}`
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
    <div className="flex flex-col w-full gap-5">
      {/* Tour Description */}
      <div className="text-md">
        <p>Tour có thời gian {dataTour.tourTime} ngày</p>
        <p>{dataTour.description}</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="font-semibold text-xl">Lịch trình</div>
        <div className="w-full">
          <div className="flex flex-col gap-4">
            {dataTour.schedules &&
              dataTour.schedules
                // Sắp xếp schedules dựa trên ngày
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((schedule, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <div className="">Ngày {schedule.date}</div>
                    {schedule.activities.map((activity, item) => (
                      <li key={item}>{activity.context}</li>
                    ))}
                  </div>
                ))}
          </div>
        </div>
      </div>

      <div>
        <div className="font-semibold text-xl">Danh mục</div>
        <div className="w-full">
          <div>
            {dataTour.categories &&
              dataTour.categories.map((category, index) => (
                <div
                  key={index}
                  className="py-1 text-gray-600 items-center px-2"
                >
                  <li>{category.categoryName}</li>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div>
        <div className="font-semibold text-xl">Tiện ích</div>
        <div className="w-full">
          <div>
            {dataTour.utilities &&
              dataTour.utilities.map((utility, index) => (
                <div
                  key={index}
                  className="text-gray-600 items-center justify-center py-1 px-2"
                >
                  <li>{utility.utilityName}</li>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div>
        <div className="font-semibold text-xl">Yêu cầu</div>
        <div className="w-full">
          <div className="grid gap-5">
            {dataTour.rules &&
              dataTour.rules.map((rule, index) => (
                <div
                  key={index}
                  className="text-gray-600 items-center justify-center px-2 py-1"
                >
                  <li>{rule.ruleName}</li>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourDetailDes;
