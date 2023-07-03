import { ReactNode, useEffect } from "react";
import { Raleway, Roboto } from "next/font/google";

import ReactPortal from "./ReactPortal";
import { IoClose } from "react-icons/io5";

const raleway = Raleway({
  weight: ["300", "400", "500", "600", "700", "900"],
  subsets: ["latin"],
  variable: "--font-raleway",
});

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  handleClose: () => void;
  isButton?: boolean;
}

export default function Modal({
  children,
  isOpen,
  handleClose,
  isButton = false,
}: ModalProps) {
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
        <div
          className={`${raleway.variable} ${roboto.variable} fixed w-modal top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 `}
        >
          <div className="w-full h-full">
            <>
              {isButton === true ? (
                <button
                  className="w-5 h-5 absolute top-2 right-6"
                  onClick={handleClose}
                >
                  <IoClose className="text-4xl font-bold text-red-700 hover:animate-wiggle" />
                </button>
              ) : null}
              {children}
            </>
          </div>
        </div>
      </>
    </ReactPortal>
  );
}
