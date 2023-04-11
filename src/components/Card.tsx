import { Product } from "../../types";

interface CardProps {
  product: Product;
}

export default function Card({ product }: CardProps) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="bg-white">
        <img src={product.image} alt={product.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {product.name}
          <div className="badge">{product.Category.name.toUpperCase()}</div>
        </h2>
        <p>{product.description}</p>
        <h3 className="card-title">{product.price} zł</h3>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Dodaj do koszyka</button>
        </div>
      </div>
    </div>
  );
}
