import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { ClipLoader } from "react-spinners";
import { routes } from "../../routes/routes";

interface SignUp {
  name: string;
  email: string;
  password: string;
}

export default function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUp>();

  const onSubmit: SubmitHandler<SignUp> = async (data) => {
    setLoading(true);

    const user = await fetch(routes.createUser, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await user.json();
    if (user.ok) {
      router.push(routes.login);
      setError("");
    } else {
      setError(res.message);
    }

    setLoading(false);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-sm font-raleway flex flex-col justify-start gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-semibold">
          Imię i nazwisko
        </label>
        <input
          id="name"
          placeholder="Podaj imię i nazwisko"
          {...register("name", { required: true })}
          className="form-input"
        />
        {errors.name && <p className="form-error">Email jest wymagany</p>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-semibold">
          Email
        </label>
        <input
          id="email"
          placeholder="Podaj adres email"
          {...register("email", { required: true })}
          className="form-input"
        />
        {errors.email && <p className="form-error">Email jest wymagany</p>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="font-semibold">
          Hasło
        </label>
        <input
          type="password"
          id="password"
          placeholder="Wprowadź hasło"
          {...register("password", { required: true })}
          className="form-input"
        />
        {errors.password && <p className="form-error">Hasło jest wymagane</p>}
      </div>
      <button className="bg-orange-500 font-bold py-3 rounded-lg mt-5 hover:bg-orange-600 hover:scale-105 flex justify-center items-center gap-2">
        Zarejestruj się {loading && <ClipLoader size={20} color="#ffffff" />}
      </button>
      {error ? <p className="form-error">{error}</p> : null}
    </form>
  );
}
