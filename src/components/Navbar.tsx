import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { MdOutlinePersonOutline, MdSpaceDashboard } from "react-icons/md";
import { RiUserLine } from "react-icons/ri";

import { Dispatch, SetStateAction, useState } from "react";
import { routes } from "../../routes/routes";
import { useBasketStore } from "../../stories/store";
import Button from "./Button";
import Nav from "./dashboard/Nav";

interface Navbar {
  inDashboard?: boolean;
  setHideContent?: Dispatch<SetStateAction<boolean>>;
}

export default function Navbar({ inDashboard, setHideContent }: Navbar) {
  const [openMenu, setOpenMenu] = useState(false);

  const { data: session } = useSession();

  const basket = useBasketStore((state) => state.basket);

  const goToSignIn = () => signIn();

  return (
    <nav className={`navbar px-8 ${inDashboard ? "bg-gray-950 shadow-xl mb-8 lg:hidden" : "bg-base-100"}`}>
      <div className="flex-1">
        <Link href={routes.home}>
          <h1 className="text-2xl text-white font-raleway font-bold">My Shop</h1>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {session?.user?.name === "Admin" && (
          <Link
            href={routes.dashboard}
            className={`hidden py-2 px-4 rounded-lg items-center gap-4 shadow-md cursor-pointer bg-orange-500 text-white ${
              inDashboard ? "lg:flex" : "md:flex"
            }`}
          >
            <MdSpaceDashboard className="w-5 h-5" />
            <p className="font-raleway font-medium">Dashboard</p>
          </Link>
        )}
        {session ? (
          <div className={`mr-4 md:mr-0 ${inDashboard && "hidden"}`}>
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
            <p className={`hidden ${inDashboard ? "lg:flex" : "md:flex"}`}>{session.user?.name}</p>
            <div className={`hidden dropdown dropdown-end ${inDashboard ? "lg:flex" : "md:flex"}`}>
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
      <button
        className={`${inDashboard ? "lg:hidden" : "md:hidden"} ${session ? "" : "hidden"}`}
        onClick={() => {
          setOpenMenu(true);
          if (setHideContent) setHideContent(true);
        }}
      >
        <IoMdMenu className="text-2xl" />
      </button>
      {openMenu && (
        <div
          className={`md:hidden absolute top-0 left-0 w-full h-full z-50 flex flex-col overflow-hidden ${
            inDashboard ? "bg-gray-900" : "bg-base-100"
          }`}
        >
          <div className="w-full h-full flex flex-col justify-between">
            <div className={`flex justify-between p-6 shadow-md ${inDashboard ? "bg-gray-950" : "bg-base-200"}`}>
              <Link href={routes.home}>
                <h1 className="text-2xl text-white font-raleway font-bold">My Shop</h1>
              </Link>
              <button
                onClick={() => {
                  setOpenMenu(false);
                  if (setHideContent) setHideContent(false);
                }}
              >
                <IoMdClose className="text-2xl" />
              </button>
            </div>
            {inDashboard && <Nav inDashboard={true} />}
            <div className={`w-full h-full px-6 py-12 ${inDashboard && "hidden"}`}>
              <Link
                href={routes.dashboard}
                className="py-4 px-4 rounded-lg flex items-center gap-4 shadow-md cursor-pointer bg-orange-500 text-white"
              >
                <MdSpaceDashboard className="w-5 h-5" />
                <p className="font-raleway font-medium">Dashboard</p>
              </Link>
            </div>
            <div className="flex flex-col items-center mb-4 p-6">
              <div className="flex items-center gap-1 mb-4">
                <p className="text-white text-lg font-normal font-raleway">| </p>
                <RiUserLine className="text-white text-2xl" />
                <p className="text-white text-lg font-normal font-raleway">{session?.user?.name} |</p>
              </div>
              <button
                className="w-full bg-orange-500 font-raleway font-bold text-sm text-white rounded-lg py-3 shadow-md hover:bg-orange-600 hover:scale-105"
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
