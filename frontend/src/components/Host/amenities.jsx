/* eslint-disable react/prop-types */
import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { PlusIcon } from "../../assets/PlusIcon";

function Amenities({ Utils, value }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const result = [
        { utilitiId: 1, utilitiesName: "wifi" },
        { utilitiId: 2, utilitiesName: "pool" },
        { utilitiId: 3, utilitiesName: "gym" },
        // Add more objects as needed
      ];
      setData(result);
    };

    loadData();
  }, []);

  const handleFree = (index) => {
    Utils((prev) => {
      const isU = prev.includes(index.utilitiId);

      if (isU) {
        return prev.filter((utilId) => utilId !== index.utilitiId);
      } else {
        return [...prev, index.utilitiId];
      }
    });
  };




  return(
    <div className="col-span-1">
      <div className="font-medium leading-6 text-gray-900">Amenities</div>
      <Button 
        className="hover:cursor-pointer flex mt-3 items-center justify-center h-16 rounded-md p-2 px-4 ring-1 ring-gray-300 bg-white" 
        onPress={onOpen}>
        {value && value.length > 0 ? `Selected ${value.length}` : "--- Select ---"}
      </Button>
      <Modal hideCloseButton size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <div className="p-5">
              
              <div className="mb-3 items-center flex justify-center">
                <span className="font-bold text-lg">Amenities</span>
              </div>

              <div className="border-y py-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4 ">
              {data.map((item) => (
                <div
                  key={item.utilitiId}
                  onClick={() => {
                    handleFree(item);
                  }}
                  className={`${
                    value && value.includes(item.utilitiId)
                      ? "bg-[#FF385C] text-white"
                      : ""
                  } hover:cursor-pointer border flex items-center gap-3 p-3 rounded-lg`}
                >
                  <span>
                    <PlusIcon className="w-8" />
                  </span>
                  <span>{item.utilitiesName}</span>
                </div>
              ))}
            </div>


              <div className="mt-3 flex justify-end">
                <Button
                  onClick={onClose}
                  className=" py-2 px-3 font-medium rounded-lg"
                >
                  Save
                </Button>
              </div>
     
            </div>
          

          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Amenities;