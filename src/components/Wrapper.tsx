import { ReactNode } from "react";

import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Wrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className={`min-h-screen w-full bg-orange-400 font-roboto`}>
        {children}
      </main>
      <Footer />
    </>
  );
}
