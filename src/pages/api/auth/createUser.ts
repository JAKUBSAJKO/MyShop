import { NextApiRequest, NextApiResponse } from "next";
const bcrypt = require("bcrypt");

import { prisma } from "../../../../server/db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;

    const exists = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    if (!exists) {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hash,
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
