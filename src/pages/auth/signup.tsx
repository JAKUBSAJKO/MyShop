import Link from "next/link";

import { routes } from "../../../routes/routes";

import SignUpForm from "@/components/SignupForm";

export default function SignUp() {
  return (
    <div className="w-full min-h-screen flex">
      <div className="hidden lg:block flex-1 bg-signup-foto bg-cover bg-no-repeat bg-center"></div>
      <div className="flex-1 bg-nav-grey-200 text-white flex flex-col justify-center items-center">
        <div className="w-72 sm:w-96">
          <h1 className="font-bold text-4xl mb-12">MyShop</h1>
          <SignUpForm />
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
