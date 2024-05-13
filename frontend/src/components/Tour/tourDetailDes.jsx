import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function TourDetailDes() {
  const tag = [
    "Free Wifi",
    "Air Conditioning",
    "Indoor pool",
    "Fitness center",
    "Restaurant",
  ];

  //fetch des
  const { productId } = useParams();
  const [des, setDes] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/${productId}`
        ); // Replace with your actual API endpoint
        const data = await response.json();
        setDes(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProduct();
  }, [productId]);

  return (
    <div className="w-full flex-col ">
      {/* description */}
      <div className="py-3">
        {des.description}
      </div>

      <div className="">
        <div className="font-semibold text-xl">Amenities</div>
        <div className="w-1/5">
          <div className="grid-rows-2 gap-2">
            {tag.map((item, index) => (
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