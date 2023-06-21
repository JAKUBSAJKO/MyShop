import { Dispatch, SetStateAction } from "react";
import AddProductForm from "./AddProductForm";

import { Category } from "../../../types";

interface AddProductProps {
  categories: Category[];
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

export default function AddProduct({
  categories,
  setOpenModal,
}: AddProductProps) {
  return (
    <div className="w-full h-full flex">
      <AddProductForm categories={categories} setOpenModal={setOpenModal} />
    </div>
  );
}
