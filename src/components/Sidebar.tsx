import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { RiUserLine } from "react-icons/ri";
import { routes } from "../../routes/routes";
import Nav from "./dashboard/Nav";

interface SidebarProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
}

export default function Sidebar({ title, setTitle }: SidebarProps) {
  const { data: session } = useSession();

  const router = useRouter();

  const logout = () => {
    signOut({ redirect: false }).then(() => {
      router.push(routes.login);
    });
  };

  return (
    <aside className="w-64 bg-gray-800 shadow-2xl px-4 flex flex-col justify-between">
      <div>
        <div className="flex justify-center items-center my-12">
          <Link href={routes.home}>
            <h1 className="text-4xl text-white font-raleway font-bold">My Shop</h1>
          </Link>
        </div>
        <Nav title={title} setTitle={setTitle} />
      </div>
      <div className="w-full h-32 bg-gray-900 mb-10 rounded-xl drop-shadow-md p-4 flex flex-col justify-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex justify-center items-center">
            <RiUserLine className="text-white text-2xl" />
          </div>
          <div className="flex-1 flex flex-col justify-center overflow-hidden text-white">
            <h2 className="text-lg font-normal font-raleway">{session?.user?.name}</h2>
            <p className="text-xs font-raleway">{session?.user?.email}</p>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={logout}
            className="w-full bg-orange-500 font-raleway font-bold text-sm text-white rounded-lg py-2 hover:bg-orange-600"
          >
            Wyloguj się
          </button>
        </div>
      </div>
    </aside>
  );
}
