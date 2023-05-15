import { useSession, signOut, signIn } from "next-auth/react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { MdOutlinePersonOutline } from "react-icons/md";

import { useBasketStore } from "../../stories/store";
import Button from "./Button";

export default function Navbar() {
  const { data: session } = useSession();

  const basket = useBasketStore((state) => state.basket);

  const goToSignIn = () => signIn();

  return (
    <nav className="navbar bg-base-100 px-8">
      <div className="flex-1">
        <a className="text-xl font-raleway font-semibold">MyShop</a>
      </div>
      <div className="flex items-center gap-4">
        {session ? (
          <div>
            <label
              htmlFor="my-drawer-4"
              tabIndex={0}
              className="btn btn-ghost btn-circle drawer-button"
            >
              <div className="indicator">
                <HiOutlineShoppingCart className="text-2xl text-nav-grey" />
                <span className="basket-badge badge-sm indicator-item">
                  {basket.length}
                </span>
              </div>
            </label>
          </div>
        ) : null}
        {session ? (
          <>
            <p>{session.user?.name}</p>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <MdOutlinePersonOutline className="text-2xl text-nav-grey" />
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
            <Button title="Zaloguj" variant="border" onClick={goToSignIn} />
          </div>
        )}
      </div>
    </nav>
  );
}
