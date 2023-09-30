import Home from "@/components/dashboard/Home";
import WrapperDashoboard from "@/layout/WrapperDashoboard";
import { useEffect } from "react";
import { dashboard } from "../../../constants";
import { useDashboardTitle } from "../../../stories/title";

export default function Main() {
  const changeTitle = useDashboardTitle((state) => state.changeTitle);

  useEffect(() => {
    changeTitle(dashboard.home);
  }, []);

  return (
    <WrapperDashoboard>
      <Home />
    </WrapperDashoboard>
  );
}
