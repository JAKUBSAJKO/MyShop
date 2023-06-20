import { ReactNode, useEffect } from "react";
import ReactPortal from "./ReactPortal";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}

export default function Modal({ children, isOpen, handleClose }: ModalProps) {
  // close modal on escape key press
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  // disable scroll on modal load
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return (): void => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <>
        <div className="fixed top-0 left-0 w-screen h-screen bg-neutral-800 opacity-50 z-10" />
        <div className="fixed w-96 h-64 bg-red-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl z-20">
          <div className="w-full h-full bg-yellow-500 rounded-xl p-4">
            <>
              <button
                className="w-5 h-5 bg-red-700 absolute top-0 right-0"
                onClick={handleClose}
              >
                Close
              </button>
              {children}
            </>
          </div>
        </div>
      </>
    </ReactPortal>
  );
}
