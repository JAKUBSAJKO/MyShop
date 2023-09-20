import Image from "next/image";

import { dashboard } from "../../../constants";
import { useDashboardTitle } from "../../../stories/title";
import Modal from "../Modal";

interface AddProductModalProps {
  isOpen: boolean;
  handleClose: () => void;
  isButton?: boolean;
}

export default function AddProductModal({ isOpen, handleClose, isButton = false }: AddProductModalProps) {
  const changeTitle = useDashboardTitle((set) => set.changeTitle);

  const finishAddProduct = () => {
    changeTitle(dashboard.home);
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} isButton={isButton}>
      <div className="w-full h-full flex flex-col items-center gap-8 py-8 bg-nav-grey-200 rounded-2xl">
        <p className="font-raleway text-xl text-white font-medium">Produkt został dodany!</p>
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
