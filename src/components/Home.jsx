import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { LocationIcon } from "../assets/LocationIcon";
import React from "react";

export default function Home() {
  const list = [
    {
      title: "anh",
      img: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?cs=srgb&dl=pexels-jaime-reimer-2662116.jpg&fm=jpg",
      price: "5.50",
    },
    {
      title: "Tangerine",
      img: "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: "3.00",
    },
    {
      title: "Raspberry",
      img: "https://images.pexels.com/photos/1450372/pexels-photo-1450372.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: "10.00",
    },
    {
      title: "Lemon",
      img: "https://images.pexels.com/photos/3601450/pexels-photo-3601450.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: "5.30",
    },
    {
      title: "Avocado",
      img: "https://images.pexels.com/photos/3703521/pexels-photo-3703521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: "15.70",
    },
    {
      title: "Lemon 2",
      img: "https://images.pexels.com/photos/2190283/pexels-photo-2190283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: "8.00",
    },
    {
      title: "Banana",
      img: "https://images.pexels.com/photos/5679531/pexels-photo-5679531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: "7.50",
    },
    {
      title: "Watermelon",
      img: "https://images.pexels.com/photos/3728078/pexels-photo-3728078.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: "12.20",
    },
  ];

  //function on hover card

  return (
    <>
      <div className="gap-4 grid grid-cols-2 sm:grid-cols-4">
        {list.map((item, index) => (
          <Card
            shadow="sm"
            key={index}
            radius="md"
            isPressable
            onPress={() => console.log("item pressed")}
          >
            <CardBody className="overflow-visible p-0">
              <div className="relative group grid justify-items-stretch">
                <div className="w-fit px-4 h-7 rounded-bl-xl rounded-tr-xl justify-center flex items-center absolute z-20 justify-self-end bg-[#FF6D70] text-white">
                  <div className="flex text-md text-white items-center gap-2">
                    <span>
                      {React.cloneElement(<LocationIcon />, {
                        width: 16,
                        height: 16,
                        stroke: "#fff",
                      })}
                    </span>
                    <span>Đà Nẵng</span>
                  </div>
                </div>

                <Image
                  shadow="sm"
                  radius="md"
                  width="100%"
                  className="w-full object-cover h-[140px] group-hover:scale-110 transform transition-transform duration-500 ease-in-out relative z-0"
                  src={item.img}
                />
              </div>
            </CardBody>

            <CardFooter>
              <div className="w-full flex flex-col gap-5">
                <div className="flex flex-col items-start gap-2">
                  <p className="text-[16px] text-[#434343] font-semibold ">
                    {item.title}
                  </p>
                  <div className="flex text-md text-[#F96D01] items-center gap-2">
                    <span>
                      {/* {React.cloneElement(<LocationIcon />, {
                        width: 16,
                        height: 16,
                      })} */}
                      VND
                    </span>
                    <span>{item.price}</span>
                  </div>
                </div>

                {/* <p className="overflow-hidden max-h-[4em] text-default-700 text-sm line-clamp-3">desription 
                  To limit the description to three lines and a certain number of characters,
                  you can use CSS to set the maximum height and use ellipsis for overflow. 
                  s an updated version of your component</p> */}

                {/* <Button
                  // color="default"
                  variant="solid"
                  className="text-slate-600 text-[16px]"
                >
                  Book This Tour
                </Button> */}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
