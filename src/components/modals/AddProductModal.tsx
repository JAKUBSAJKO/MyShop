import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

import Modal from "../Modal";
import { dashboard } from "../../../constants";

interface AddProductModalProps {
  isOpen: boolean;
  handleClose: () => void;
  isButton?: boolean;
  setTitle: Dispatch<SetStateAction<string>>;
}

export default function AddProductModal({
  isOpen,
  handleClose,
  isButton = false,
  setTitle,
}: AddProductModalProps) {
  const finishAddProduct = () => {
    setTitle(dashboard.home);
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} isButton={isButton}>
      <div className="w-full h-full flex flex-col items-center gap-8 py-8 bg-nav-grey-200 rounded-2xl">
        <p className="font-raleway text-xl text-white font-medium">
          Produkt został dodany!
        </p>
        <Image src="/images/addproduct.png" alt="" width={104} height={180} />
        <div className="flex gap-4">
          <button className="modal-btn" onClick={finishAddProduct}>
            Zakończ
          </button>
          <button className="modal-btn" onClick={() => handleClose()}>
            Dodaj kolejny produkt
          </button>
        </div>
      </div>
    </Modal>
  );
}
