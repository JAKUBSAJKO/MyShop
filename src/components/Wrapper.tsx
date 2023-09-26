import { ReactNode } from "react";

import Footer from "./Footer";
import Navbar from "./Navbar";

interface WrapperProps {
  children: ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
  return (
    <>
      <Navbar />
      <main className={`min-h-screen w-full bg-orange-400 font-roboto`}>{children}</main>
      <Footer />
    </>
  );
}
