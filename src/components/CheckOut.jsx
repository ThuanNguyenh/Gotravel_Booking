import { Button, Card, CardBody, Image } from "@nextui-org/react";
import { LocationIcon } from "../assets/LocationIcon";

function CheckOut() {
  return (
    <div className="grid grid-cols-6 md:grid-cols-12 md:gap-4 p-[3%]">

{/* Detail Tour & Selection */}
      <div className="flex flex-col col-span-9 md:col-span-9">
        <div className="bg-slate-100 rounded-lg">
          <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50"
            shadow="none"
          >
            <CardBody>
              <div className="grid grid-cols-6 md:grid-cols-12 md:gap-4 items-center justify-center">
                <div className="relative col-span-3 md:col-span-3">
                  <Image
                    height={150}
                    shadow="md"
                    src="https://img.directbooking.ro/getimage.ashx?f=Statiuni&w=600&h=399&file=Statiune_2cc49871-736f-43c5-a388-b4d0c4d1c06b.jpg"
                    width="100%"
                  />
                </div>

                <div className="flex flex-col col-span-5 md:col-span-5">
                  <div className="flex flex-col justify-between gap-5">
                    <div className="flex flex-col gap-0">
                      <h3 className="font-semibold text-2xl text-foreground/90">
                        Ha noi
                      </h3>
                      <div className="flex flex-row">
                        <LocationIcon />
                        <p className="text-small text-foreground/80 text-[#73D8FC]">
                          Viet Nam
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-row bg-slate-100 w-fit gap-5 p-3 justify-between text-medium font-lights text-slate-500">
                      <div>
                        <h1 className="">Check in</h1>
                        <h1 className="">Date</h1>
                      </div>
                      <div>
                        <h1 className="">Check out</h1>
                        <h1 className="">Date</h1>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </CardBody>
          </Card>
        </div>
      </div>

{/* Price BreakUp */}
      <div className="col-span-3 md:col-span-3">
        <div className="bg-slate-100 rounded-lg p-2">
            <div className="rounded flex flex-col justify-start items-start">

                <div className="text-black text-xl font-bold">Price Breakup</div>

                <div className="py-2.5 border-b border-gray-300 w-full flex justify-between">
                    <div className="text-sm font-medium text-gray-600">Base Price</div>
                    <div className="font-semibold">$95,200</div>
                </div>

                <div className="py-2.5 border-b border-gray-300 w-full flex justify-between">
                    <div className="text-sm font-medium text-blue-500">Total Discount</div>
                    <div className="font-semibold">$15,708</div>
                </div>

                <div className="py-2.5 w-full flex justify-between">
                    <div className="text-md font-semibold text-gray-600">Total Amount to be paid </div>
                    <div className="font-semibold">$100</div>
                </div>

            </div>
        </div>
        <div className="pt-5">
            <Button className="w-full text-lg text-white bg-[#73D8FC]">
                Reserve Now
            </Button>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
