/* eslint-disable react/prop-types */
import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { PlusIcon } from "../../assets/PlusIcon";
import axios from "axios";

function Rules({ Rules, value }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [data, setData] = useState([]);

  // get token from localStorage
  const token = localStorage.getItem("accessToken");

  const loadData = async () => {
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
        `http://localhost:8080/api/v1/directory/rules`,
        config
      );
      setData(response.data);
      console.log("rules: ", response.data);
    } catch (error) {
      console.log("Error")
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleFree = (index) => {
    Rules((prev) => {
      const isU = prev.includes(index.ruleId);

      if (isU) {
        return prev.filter((cateId) => cateId !== index.ruleId);
      } else {
        return [...prev, index.ruleId];
      }
    });
  };

  return (
    <div className="col-span-1">
      <Button
        variant="faded"
        className="flex mt-3 items-center justify-center h-14 w-32 rounded-md"
        onPress={onOpen}
      >
        {value && value.length > 0
          ? `Đã chọn ${value.length}`
          : "Quy định"}
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
                <span className="font-bold text-lg">Quy định</span>
              </div>

              <div className="border-y py-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4 ">
                {data.map((item) => (
                  <div
                    key={item.ruleId}
                    onClick={() => {
                      handleFree(item);
                    }}
                    className={`${
                      value && value.includes(item.ruleId)
                        ? "bg-[#FF385C] text-white"
                        : ""
                    } hover:cursor-pointer border flex items-center gap-3 p-3 rounded-lg`}
                  >
                    <span>
                      <PlusIcon className="w-8" />
                    </span>
                    <span>{item.ruleName}</span>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex justify-end">
                <Button
                  onClick={onClose}
                  className=" py-2 px-3 font-medium rounded-lg"
                >
                  Lưu
                </Button>
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Rules;
