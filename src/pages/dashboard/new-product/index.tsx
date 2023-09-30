import AddProductForm from "@/components/dashboard/AddProductForm";
import WrapperDashoboard from "@/layout/WrapperDashoboard";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { dashboard } from "../../../../constants";
import { getCategories } from "../../../../services/services";
import { useDashboardTitle } from "../../../../stories/title";

export default function NewProduct() {
  const { data: categories } = useQuery("categories", getCategories);

  const changeTitle = useDashboardTitle((state) => state.changeTitle);

  useEffect(() => {
    changeTitle(dashboard.addProduct);
  }, []);

  return (
    <WrapperDashoboard>
      <div className="w-full h-full flex justify-center sm:justify-start sm:pl-5 lg:pl-0">
        <AddProductForm categories={categories} />
      </div>
    </WrapperDashoboard>
  );
}
