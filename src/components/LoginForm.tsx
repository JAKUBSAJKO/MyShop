import { useForm, SubmitHandler } from "react-hook-form";
import { SignInResponse, signIn } from "next-auth/react";
import { routes } from "../../routes/routes";
import { useState } from "react";
import { useRouter } from "next/router";

interface Login {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [error, setError] = useState("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Login>();

  const onSubmit: SubmitHandler<Login> = (data) => {
    signIn("credentials", {
      username: data.email,
      password: data.password,
      redirect: false,
    }).then((value: SignInResponse | undefined) => {
      if (value !== undefined) {
        const { ok } = value;
        if (ok) {
          router.push(routes.home);
          setError("");
        } else {
          setError("Dane logowania błędne");
        }
      }
    });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-sm font-raleway flex flex-col justify-start gap-8"
    >
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
      <button className="form-btn">Zaloguj się</button>
      {error ? <p className="form-error">{error}</p> : null}
    </form>
  );
}
