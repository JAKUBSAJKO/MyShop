import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../../server/db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { productId } = req.query;

  if (req.method === "PATCH") {
    const { currentQuantity } = req.body;
    await prisma.product.update({
      where: {
        id: productId as string,
      },
      data: {
        quantity: currentQuantity,
      },
    });
    res.status(204).send("No content");
  }
}
