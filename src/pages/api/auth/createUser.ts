import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../../server/db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;

    const users = await prisma.user.findMany();

    const emailExist = users.find((userDB) => userDB.email === email);

    console.log(emailExist);

    if (!emailExist) {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password,
        },
      });
      res.status(201).json({ message: "Konto utworzone" });
    } else {
      res
        .status(404)
        .json({ message: "Adres e-mail już istnieje w bazie danych." });
    }
  }
}
