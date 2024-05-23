import {Tabs, Tab} from "@nextui-org/react";
import Request from "./request";
import DeniedBooking from "./denied";
import ConfirmedBooking from "./comfirmed";
import CompletedBooking from "./completed";

export default function RequestBooking() {
  return (
    <div className="flex w-full flex-col h-56">
      <Tabs aria-label="Options">
        <Tab key="request" title="Request">
          <Request/>
        </Tab>
        <Tab key="comfirmed" title="Comfirmed">
          <ConfirmedBooking/>
        </Tab>
        <Tab key="denied" title="Denied">
          <DeniedBooking/>
        </Tab>
        <Tab key="IN_PROGRESS" title="IN PROGRESS">
          <DeniedBooking/>
        </Tab>
        <Tab key="complete" title="Completed">
          <CompletedBooking/>
        </Tab>
      </Tabs>
    </div>  
  );
}



