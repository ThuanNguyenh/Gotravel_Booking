/* eslint-disable react/prop-types */
import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { PlusIcon } from "../../assets/PlusIcon";
import axios from "axios";

function Category({ Cates, value }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [data, setData] = useState([]);

  const loadData = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/v1/directory/categories`
    );
    setData(result.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleFree = (index) => {
    Cates((prev) => {
      const isU = prev.includes(index.categoryId);

      if (isU) {
        return prev.filter((cateId) => cateId !== index.categoryId);
      } else {
        return [...prev, index.categoryId];
      }
    });
  };

  return (
    <div className="col-span-1">
      <Button
        variant="faded"
        className="flex mt-3 items-center justify-center h-14 w-32 rounded-md "
        onPress={onOpen}
      >
        {value && value.length > 0
          ? `Đã chọn ${value.length} Loại hình`
          : "Loại hình"}
      </Button>
      <Modal
        hideCloseButton
        size="5xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <div className="p-5">
              <div className="mb-3 items-center flex justify-center">
                <span className="font-bold text-lg">Loại hình</span>
              </div>

              <div className="border-y py-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4 ">
                {data.map((item) => (
                  <div
                    key={item.categoryId}
                    onClick={() => {
                      handleFree(item);
                    }}
                    className={`${
                      value && value.includes(item.categoryId)
                        ? "bg-[#FF385C] text-white"
                        : ""
                    } hover:cursor-pointer border flex items-center gap-3 p-3 rounded-lg`}
                  >
                    <span>
                      <PlusIcon className="w-8" />
                    </span>
                    <span>{item.categoryName}</span>
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

export default Category;
