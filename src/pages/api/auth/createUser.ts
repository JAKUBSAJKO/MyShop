import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../../server/db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const user = await prisma.user.create({
      data: {
        name: "Jacob Unknown",
        email: "jacobunknown@gmail.com",
        password: "test123",
      },
    });

    res.status(200).json(user);
  }
}
