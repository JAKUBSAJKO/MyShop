import { useSession, signIn, signOut } from "next-auth/react";

import { useBasketStore } from "../../stories/store";

export default function Navbar() {
  const { data: session } = useSession();

  const basket = useBasketStore((state) => state.basket);

  return (
    <nav className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">MyShop</a>
      </div>
      <div className="flex-none">
        <div>
          <label
            htmlFor="my-drawer-4"
            tabIndex={0}
            className="btn btn-ghost btn-circle drawer-button"
          >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">
                {basket.length}
              </span>
            </div>
          </label>
          {/* <div
            tabIndex={0}
            className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-auto"
            >
              {basket.map((product) => (
                <div key={product.id}>
                  <p>{product.name}</p>
                  <img src={product.image} width={64} />
                  <p>Cena: {product.price} zł/szt.</p>
                  <p>Ilość: {product.quantity}</p>
                </div>
              ))}
            </ul>
          </div> */}
        </div>
        {session ? (
          <>
            <p>{session.user?.email}</p>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full bg-blue-800">
                  {/* <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>Zamówienie</a>
                </li>
                <li>
                  <button onClick={() => signOut()}>Wyloguj</button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <div>
            <button onClick={() => signIn()}>Zaloguj</button>
          </div>
        )}
      </div>
    </nav>
  );
}
