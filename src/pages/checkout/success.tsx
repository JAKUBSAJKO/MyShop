import { useEffect } from "react";
import { useRouter } from "next/router";

import { routes } from "../../../routes/routes";

export default function Success() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push(routes.home);
    }, 3000);
  }, []);

  return (
    <div>
      <h1>Płatność poszła pomyślnie ❤❤❤</h1>
    </div>
  );
}
