import Image from "next/image";
import Modal from "../Modal";

interface AfterDeleteProductModalProps {
  isOpen: boolean;
  handleClose: () => void;
  isButton?: boolean;
}

export default function AfterDeleteProductModal({
  isOpen,
  handleClose,
  isButton = false,
}: AfterDeleteProductModalProps) {
  return (
    <Modal isOpen={isOpen} handleClose={handleClose} isButton={isButton}>
      <div className="w-full h-full flex flex-col items-center gap-8 py-8 bg-nav-grey-200 rounded-2xl">
        <Image
          src="/images/deleteproduct.png"
          alt=""
          width={176}
          height={280}
        />
        <p className="font-raleway text-xl text-white font-medium">
          Produkt został usunięty!
        </p>
      </div>
    </Modal>
  );
}
