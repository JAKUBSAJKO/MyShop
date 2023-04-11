import { Raleway, Roboto } from "next/font/google";

import { prisma } from "../../server/db/client";
import { Product } from "../../types";

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

export default function Home({ products }: { products: Product[] }) {
  console.log(products);
  return (
    <main
      className={`${raleway.variable} ${roboto.variable} min-h-screen w-full bg-orange-400 font-roboto`}
    >
      <div className="h-20 border-b-2"></div>
      <div className="max-w-5xl mx-auto py-32 flex flex-wrap justify-center items-center gap-4">
        {products.map((product: Product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const products = await prisma.product.findMany({
    include: {
      Category: true,
    },
  });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
