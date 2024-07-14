import {
  Card,
  CardBody,
  CardHeader,
  Image,
} from "@nextui-org/react";
import CategoryTour from "./CategoryTour";
import TopTour from "./TopTour";
import ScrollToTopButton from "../alert/ScrollToTopButton";

// eslint-disable-next-line react/prop-types
export default function ListTour() {

  return (
    <div>
      <div>
        <TopTour />
      </div>

      <div>
        <CategoryTour />
      </div>
      <div className="mt-4">
        <Card
          className="bg-[url('./banner02.png')] shadow-none rounded-none col-span-12 sm:col-span-7 relative bg-cover bg-center"
          
        >
          <CardHeader className="relative z-10 top-1 flex-col items-start p-4">
            <p className="text-[24px] font-bold">Lý do nên chọn TourTrek?</p>
          </CardHeader>
          <CardBody className="relative z-10 font-semibold gap-4 grid md:grid-cols-4 mb-4">
            <div className="flex gap-2 items-center bg-white shadow-md rounded-lg p-5 border">
              <Image
                alt="Breathing app icon"
                className="w-[64px] h-[64px]"
                src="./variety.png"
              />
              <div className="flex flex-col">
                <p>Đa dạng Tour với nhiều ưu đãi hấp dẫn</p>
              </div>
            </div>

            <div className="flex gap-2 items-center bg-white shadow-md rounded-lg p-5 border">
              <Image
                alt="Breathing app icon"
                className="w-[64px] h-[64px]"
                src="./convenient.png"
              />
              <div className="flex flex-col">
                <p>Xác nhận đặt chỗ linh hoạt và tức thì</p>
              </div>
            </div>

            <div className="flex gap-2 items-center bg-white shadow-md rounded-lg p-5 border">
              <Image
                alt="Breathing app icon"
                className="w-[64px] h-[64px]"
                src="./security.png"
              />
              <div className="flex flex-col">
                <p>Thanh toán an toàn và thuận tiện</p>
              </div>
            </div>

            <div className="flex gap-2 items-center bg-white shadow-md rounded-lg p-5 border">
              <Image
                alt="Breathing app icon"
                className="w-[50px] h-[50px]"
                src="./cooperate.png"
              />
              <div className="flex flex-col">
                <p>Đối tác Tour uy tín và chuyên nghiệp</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <ScrollToTopButton/>
    </div>
  );
}
