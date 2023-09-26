import { signIn, signOut, useSession } from "next-auth/react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { MdOutlinePersonOutline } from "react-icons/md";
import { RiUserLine } from "react-icons/ri";

import { useState } from "react";
import { useBasketStore } from "../../stories/store";
import Button from "./Button";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);

  const { data: session } = useSession();

  const basket = useBasketStore((state) => state.basket);

  const goToSignIn = () => signIn();

  return (
    <nav className="navbar bg-base-100 px-8">
      <div className="flex-1">
        <p className="text-xl font-raleway font-semibold">MyShop</p>
      </div>
      <div className="flex items-center gap-4">
        {session ? (
          <div className="mr-4 md:mr-0">
            <label htmlFor="my-drawer-4" tabIndex={0} className="btn btn-ghost btn-circle drawer-button">
              <div className="indicator">
                <HiOutlineShoppingCart className="text-2xl text-nav-grey" />
                <span className="basket-badge badge-sm indicator-item">{basket.length}</span>
              </div>
            </label>
          </div>
        ) : null}
        {session ? (
          <>
            <p className="hidden md:flex">{session.user?.name}</p>
            <div className="hidden md:flex dropdown dropdown-end">
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
      <button className={`md:hidden ${session ? "" : "hidden"}`} onClick={() => setOpenMenu(true)}>
        <IoMdMenu className="text-2xl" />
      </button>
      {openMenu && (
        <div className="md:hidden absolute top-0 left-0 w-full h-full bg-base-100 z-50 flex flex-col p-6">
          <div className="w-full h-full flex flex-col justify-between">
            <div className="flex justify-between">
              <p className="text-xl font-raleway font-semibold">MyShop</p>
              <button onClick={() => setOpenMenu(false)}>
                <IoMdClose className="text-2xl" />
              </button>
            </div>
            <div className="flex flex-col items-center mb-4">
              <div className="flex items-center gap-1 mb-4">
                <p className="text-white text-lg font-normal font-raleway">| </p>
                <RiUserLine className="text-white text-2xl" />
                <p className="text-white text-lg font-normal font-raleway">{session?.user?.name} |</p>
              </div>
              <button
                className="w-full bg-orange-500 font-raleway font-bold text-sm text-white rounded-lg py-3 hover:bg-orange-600 hover:scale-105"
                onClick={() => signOut()}
              >
                Wyloguj
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
