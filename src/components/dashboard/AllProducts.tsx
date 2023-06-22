import { Product } from "../../../types";
import AllProductsTable from "./AllProductsTable";

interface AllProductsProps {
  products: Product[] | undefined;
}

export default function AllProducts({ products }: AllProductsProps) {
  return (
    <div className="w-full h-full">
      <AllProductsTable products={products} />
    </div>
  );
}
