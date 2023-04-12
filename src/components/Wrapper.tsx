import { ReactNode } from "react";
import { Raleway, Roboto } from "next/font/google";

import Footer from "./Footer";
import Navbar from "./Navbar";

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

export default function Wrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main
        className={`${raleway.variable} ${roboto.variable} min-h-screen w-full bg-orange-400 font-roboto`}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
