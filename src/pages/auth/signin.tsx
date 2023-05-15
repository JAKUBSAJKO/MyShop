import Link from "next/link";

import { routes } from "../../../routes/routes";

import SignInForm from "@/components/SigninForm";

export default function SignIn() {
  return (
    <div className="w-full min-h-screen flex">
      <div className="flex-1 bg-orange-400"></div>
      <div className="flex-1 bg-nav-grey-200 text-white flex flex-col justify-center items-center">
        <div className="w-96">
          <h1 className="font-bold text-4xl mb-12">MyShop</h1>
          <SignInForm />
          <p className="mt-4 font-semibold">
            Masz już konta?{" "}
            <Link href={routes.login} className="text-orange-500">
              Zaloguj się
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
