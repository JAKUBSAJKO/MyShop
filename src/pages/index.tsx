import { Raleway, Roboto } from "next/font/google";

import Card from "@/components/Card";

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

const products = [
  {
    id: 1,
    name: "Papryka",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti est impedit cupiditate expedita maxime.",
    price: 2.5,
  },
  {
    id: 2,
    name: "Pomidor",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti est impedit cupiditate expedita maxime.",
    price: 2.2,
  },
  {
    id: 3,
    name: "Ziemniak",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti est impedit cupiditate expedita maxime.",
    price: 1.2,
  },
  {
    id: 4,
    name: "Marchewka",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti est impedit cupiditate expedita maxime.",
    price: 1.0,
  },
  {
    id: 5,
    name: "Pietruszka",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti est impedit cupiditate expedita maxime.",
    price: 2.1,
  },
];

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export default function Home() {
  return (
    <main
      className={`${raleway.variable} ${roboto.variable} min-h-screen w-full bg-orange-400 font-roboto`}
    >
      <div className="h-20 border-b-2"></div>
      <div className="max-w-5xl mx-auto my-32 flex flex-wrap justify-center items-center gap-4">
        {products.map((product: Product) => (
          <Card product={product} />
        ))}
      </div>
      <div className="h-14"></div>
    </main>
  );
}
