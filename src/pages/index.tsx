import { prisma } from "../../server/db/client";
import { Product } from "../../types";
import { useBasketStore } from "../../stories/store";

import Card from "@/components/Card";
import Wrapper from "@/components/Wrapper";

export default function Home({ products }: { products: Product[] }) {
  const basket = useBasketStore((state) => state.basket);

  return (
    <div>
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Wrapper>
            <div className="max-w-5xl mx-auto py-32 flex flex-wrap justify-center items-center gap-4">
              {products.map((product: Product) => (
                <Card key={product.id} product={product} />
              ))}
            </div>
          </Wrapper>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
          <ul className="menu p-4 w-96 bg-base-100 text-base-content">
            {basket.map((product) => (
              <div key={product.id}>
                <p>{product.name}</p>
                <img src={product.image} width={64} />
                <p>Cena: {product.price} zł/szt.</p>
                <p>Ilość: {product.quantity}</p>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
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
