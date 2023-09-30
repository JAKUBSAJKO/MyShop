import AddProductForm from "@/components/dashboard/AddProductForm";
import WrapperDashoboard from "@/layout/WrapperDashoboard";
import { useQuery } from "react-query";
import { getCategories } from "../../../../services/services";

export default function NewProduct() {
  const { data: categories } = useQuery("categories", getCategories);

  return (
    <WrapperDashoboard>
      <div className="w-full h-full flex justify-center sm:justify-start sm:pl-5 lg:pl-0">
        <AddProductForm categories={categories} />
      </div>
    </WrapperDashoboard>
  );
}
