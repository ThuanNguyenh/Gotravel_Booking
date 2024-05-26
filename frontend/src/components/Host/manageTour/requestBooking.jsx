import { Tabs, Tab } from "@nextui-org/react";
import Request from "./request";
import DeniedBooking from "./denied";
import ConfirmedBooking from "./comfirmed";
import CompletedBooking from "./completed";

export default function RequestBooking() {
  return (
    <div className="flex w-full flex-col h-56">
      <Tabs aria-label="Options">
        <Tab key="request" title="Yêu cầu">
          <Request />
        </Tab>
        <Tab key="comfirmed" title="Đã xác nhận">
          <ConfirmedBooking />
        </Tab>

        <Tab key="IN_PROGRESS" title="Đang diễn ra">
          <DeniedBooking />
        </Tab>

        <Tab key="complete" title="Đã hoàn thành">
          <CompletedBooking />
        </Tab>
      </Tabs>
    </div>
  );
}
