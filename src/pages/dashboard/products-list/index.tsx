import AllProducts from "@/components/dashboard/AllProducts";
import WrapperDashoboard from "@/layout/WrapperDashoboard";
import { useEffect } from "react";
import { dashboard } from "../../../../constants";
import { useDashboardTitle } from "../../../../stories/title";

export default function ProductsList() {
  const changeTitle = useDashboardTitle((state) => state.changeTitle);

  useEffect(() => {
    changeTitle(dashboard.allProducts);
  }, []);

  return (
    <WrapperDashoboard>
      <AllProducts />
    </WrapperDashoboard>
  );
}
