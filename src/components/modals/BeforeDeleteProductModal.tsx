import { AxiosResponse } from "axios";
import { Dispatch, SetStateAction } from "react";
import { UseMutateFunction } from "react-query";
import { supabase } from "../../../lib/supabase/supabaseClient";
import { Product } from "../../../types";
import Modal from "../Modal";

interface BeforeDeleteProductModalProps {
  isOpen: boolean;
  handleClose: () => void;
  isButton?: boolean;
  productToDelete: string;
  mutate: UseMutateFunction<AxiosResponse<any, any>, unknown, void, unknown>;
  products: Product[] | undefined;
  setOpenModalAfterDeleteProduct: Dispatch<SetStateAction<boolean>>;
}

export default function BeforeDeleteProductModal({
  isOpen,
  handleClose,
  isButton = false,
  mutate,
  productToDelete,
  products,
  setOpenModalAfterDeleteProduct,
}: BeforeDeleteProductModalProps) {
  const deleteProduct = async () => {
    await mutate();
    await deleteProductImageFromStorage();
    handleClose();
    setOpenModalAfterDeleteProduct(true);
    setTimeout(() => {
      setOpenModalAfterDeleteProduct(false);
    }, 3000);
  };

  const deleteProductImageFromStorage = async () => {
    const productPickedToDelete = products?.filter((product) => product.id === productToDelete);

    if (typeof productPickedToDelete !== "undefined") {
      const productURL = productPickedToDelete[0].image!;
      const fileName = productURL?.substring(productURL?.lastIndexOf("/") + 1);
      const { data, error } = await supabase.storage.from("myshop").remove([`products/${fileName}`]);
    }
  };

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} isButton={isButton}>
      <div className="w-full h-full flex flex-col items-center gap-8 py-12 bg-nav-grey-200 rounded-2xl drop-shadow-md">
        <p className="font-raleway text-xl text-white font-medium">Czy napewno chcesz usunać produkt?</p>
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
