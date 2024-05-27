import React from "react";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { ChevronDownIcon } from "../../assets/ChevronDownIcon ";

export default function Language() {
  const [selectedOption, setSelectedOption] = React.useState(new Set(["vi"]));

  const descriptionsMap = {
    vi: "Tiếng Việt",
    en: "English",
    ja: "日本語",
  };

  const labelsMap = {
    vi: { label: "VI", icon: "/vietnam.png" },
    en: { label: "EN", icon: "/america.png" },
    ja: { label: "JP", icon: "/japan.png" },
  };

  // Convert the Set to an Array and get the first value.
  const selectedOptionValue = Array.from(selectedOption)[0];

  return (
    <ButtonGroup variant="flat bg-none" className="w-28 sm:block hidden">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button
            className="font-semibold"
            radius="full"
            endContent={<ChevronDownIcon />}
            startContent={
              <Avatar
                alt="Argentina"
                className="w-6 h-6"
                src={labelsMap[selectedOptionValue].icon}
              />
            }
          >
            {labelsMap[selectedOptionValue].label}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Merge options"
          selectedKeys={selectedOption}
          selectionMode="single"
          onSelectionChange={setSelectedOption}
          className="max-w-[300px] font-semibold"
        >
          <DropdownItem
            key="vi"
            description={descriptionsMap["vi"]}
            startContent={
              <img alt="vietnam" className="h-6 w-9 " src="/vietnam1.png" />
            }
          ></DropdownItem>
          <DropdownItem
            key="en"
            description={descriptionsMap["en"]}
            startContent={
              <img alt="english" className="w-9 h-6" src="/america1.png" />
            }
          ></DropdownItem>
          <DropdownItem
            key="ja"
            description={descriptionsMap["ja"]}
            startContent={
              <img alt="japan" className="w-9 h-6" src="/japan1.png" />
            }
          ></DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
}
