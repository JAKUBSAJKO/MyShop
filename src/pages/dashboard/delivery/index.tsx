import DeliveryContent from "@/components/dashboard/DeliveryContent";
import WrapperDashoboard from "@/layout/WrapperDashoboard";
import { useEffect } from "react";
import { dashboard } from "../../../../constants";
import { useDashboardTitle } from "../../../../stories/title";

export default function Delivery() {
  const changeTitle = useDashboardTitle((state) => state.changeTitle);

  useEffect(() => {
    changeTitle(dashboard.enterDelivery);
  }, []);

  return (
    <WrapperDashoboard>
      <DeliveryContent />
    </WrapperDashoboard>
  );
}
