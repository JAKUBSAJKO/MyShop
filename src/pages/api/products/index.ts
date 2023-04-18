import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../server/db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const products = await prisma.product.findMany({
      include: {
        Category: true,
      },
      orderBy: {
        created_at: "asc",
      },
    });
    res.status(200).json(products);
  }
}
