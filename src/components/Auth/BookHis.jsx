import { Card, CardBody, Button, Image } from "@nextui-org/react";
import { LocationIcon } from "../../assets/LocationIcon";
import { useState } from "react";

function BookingHistory() {


    // eslint-disable-next-line no-unused-vars
    const [cities, setCities] = useState([
        { id: 1, name: 'Paris', nation: 'France' },
        { id: 2, name: 'Tokyo', nation: 'Japan' },
        { id: 3, name: 'New York', nation: 'USA' },
        { id: 4, name: 'London', nation: 'UK' },
        { id: 5, name: 'Sydney', nation: 'Australia' }
      ]);



  return (
    <div>
      <div className="flex flex-col gap-10">
        <Card>
          <div className="px-7 py-5">
            <div className="flex justify-between">
              <h1 className="text-2xl font-semibold">Tour List</h1>
              <Button variant="light" className="text-blue-400">
                Lastest Tour
              </Button>
            </div>
            {cities.map(city => (
            <Card
              key={city.id}
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
                            {city.name}
                        </h3>
                        <div className="flex flex-row">
                            <LocationIcon/>
                            <p className="text-small text-foreground/80 text-[#73D8FC]">{city.nation}</p>
                        </div>
                      </div>

                      <div className="flex flex-row bg-slate-100 w-fit gap-5 p-3 justify-between text-medium font-lights text-slate-500">
                        <div>
                            <h1 className="">
                            Check in
                            </h1>
                            <h1 className="">
                            Date
                            </h1>
                        </div>
                        <div>
                            <h1 className="">
                            Check out
                            </h1>
                            <h1 className="">
                            Date
                            </h1>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="flex flex-col col-span-4 md:col-span-4 items-end gap-5 text-right h-full  justify-between">

                        <div className="font-semibold text-2xl text-foreground/90">                        
                          $19            
                        </div>
                        <div>
                        <Button className="bg-[#73D8FC] text-large text-white font-medium">
                            Booking Comfirmed
                        </Button>
                        </div>

                  </div>
                </div>
              </CardBody>
            </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default BookingHistory;
