import Link from "next/link";

import { routes } from "../../../routes/routes";

import LoginForm from "@/components/LoginForm";

export default function SignUp() {
  return (
    <div className="w-full min-h-screen flex">
      <div className="flex-1 bg-login-foto bg-cover bg-no-repeat bg-center"></div>
      <div className="flex-1 bg-nav-grey-200 text-white flex flex-col justify-center items-center">
        <div className="w-96">
          <h1 className="font-bold text-4xl mb-12">MyShop</h1>
          <LoginForm />
          <p className="mt-4 font-semibold">
            Nie masz konta?{" "}
            <Link href={routes.signup} className="text-orange-500">
              Zarejestruj się
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
