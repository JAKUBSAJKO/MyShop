import { ReactNode, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ReactPortalProps {
  children: ReactNode;
  wrapperId: string;
}

const createWrapperAndAppendToBody = (wrapperId: string) => {
  if (!document) return null;
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
};

export default function ReactPortal({ children, wrapperId }: ReactPortalProps) {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement>();

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;

    // if element is not found with wrapperId or wrapperId is not provided,
    // create and append to body

    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }

    setWrapperElement(element!);

    return () => {
      // delete the programatically created element
      if (systemCreated && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  // wrapperElement state will be null on the very first render.
  if (!wrapperElement) return null;
  return createPortal(children, wrapperElement);
}
