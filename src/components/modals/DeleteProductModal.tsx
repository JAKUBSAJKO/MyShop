import { UseMutateFunction } from "react-query";
import { AxiosResponse } from "axios";
import Modal from "../Modal";
import { Product } from "../../../types";
import { supabase } from "../../../lib/supabase/supabaseClient";

interface AddProductModalProps {
  isOpen: boolean;
  handleClose: () => void;
  isButton?: boolean;
  productToDelete: string;
  mutate: UseMutateFunction<AxiosResponse<any, any>, unknown, void, unknown>;
  products: Product[] | undefined;
}

export default function DeleteProductModal({
  isOpen,
  handleClose,
  isButton = false,
  mutate,
  productToDelete,
  products,
}: AddProductModalProps) {
  const deleteProduct = () => {
    mutate();
    deleteProductImageFromStorage();
    handleClose();
  };

  const deleteProductImageFromStorage = async () => {
    const productPickedToDelete = products?.filter(
      (product) => product.id === productToDelete
    );

    if (typeof productPickedToDelete !== "undefined") {
      const productURL = productPickedToDelete[0].image!;
      const fileName = productURL?.substring(productURL?.lastIndexOf("/") + 1);
      const { data, error } = await supabase.storage
        .from("myshop")
        .remove([`products/${fileName}`]);
    }
  };

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} isButton={isButton}>
      <div className="w-full h-full flex flex-col items-center gap-8 py-12 bg-nav-grey-200 rounded-2xl">
        <p className="font-raleway text-xl text-white font-medium">
          Czy napewno chcesz usunać produkt?
        </p>
        <div className="flex gap-8">
          <button className="modal-btn-medium" onClick={() => handleClose()}>
            Nie
          </button>
          <button className="modal-btn-medium" onClick={deleteProduct}>
            Tak
          </button>
        </div>
      </div>
    </Modal>
  );
}
