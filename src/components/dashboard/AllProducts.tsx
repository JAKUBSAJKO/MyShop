import { useQuery } from "react-query";
import { getProducts } from "../../../services/services";
import { Product } from "../../../types";
import AllProductsTable from "./AllProductsTable";

export default function AllProducts() {
  const { data: products } = useQuery<Product[]>("products", getProducts);

  return (
    <div className="w-full h-full">
      <AllProductsTable products={products} />
    </div>
  );
}
