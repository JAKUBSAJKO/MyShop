import { Product } from "@/pages";

interface CardProps {
  product: Product;
}

export default function Card({ product }: CardProps) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img
          src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description}</p>
        <h3 className="card-title">{product.price} zł</h3>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Dodaj do koszyka</button>
        </div>
      </div>
    </div>
  );
}
