import Card from "@/components/Card";
import Wrapper from "@/components/Wrapper";

import { Product } from "../../types";

interface Content {
  products: Product[];
}

export default function Content({ products }: Content) {
  return (
    <div className="drawer-content">
      <Wrapper>
        <div className="max-w-5xl mx-auto py-32 flex flex-wrap justify-center items-center gap-4">
          {products?.map((product: Product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </Wrapper>
    </div>
  );
}
