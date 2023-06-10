import AddProductForm from "./AddProductForm";

import { Category } from "../../../types";

interface AddProductProps {
  categories: Category[];
}

export default function AddProduct({ categories }: AddProductProps) {
  return (
    <div className="w-full h-full bg-red-500 flex">
      <AddProductForm categories={categories} />
    </div>
  );
}
