import { UseMutateFunction } from "react-query";
import Modal from "../Modal";
import { AxiosResponse } from "axios";

interface AddProductModalProps {
  isOpen: boolean;
  handleClose: () => void;
  isButton?: boolean;
  productToDelete: string;
  mutate: UseMutateFunction<AxiosResponse<any, any>, unknown, void, unknown>;
}

export default function DeleteProductModal({
  isOpen,
  handleClose,
  isButton = false,
  mutate,
}: AddProductModalProps) {
  const deleteProduct = () => {
    mutate();
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} isButton={isButton}>
      <div className="w-full h-full flex flex-col items-center gap-8 py-8 bg-nav-grey-200 rounded-2xl">
        <p className="font-raleway text-xl text-white font-normal">
          Czy napewno chcesz usunać produkt?
        </p>
        <button className="modal-btn" onClick={() => handleClose()}>
          Nie
        </button>
        <button className="modal-btn" onClick={deleteProduct}>
          Tak
        </button>
      </div>
    </Modal>
  );
}
