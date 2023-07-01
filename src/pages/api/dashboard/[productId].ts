import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../server/db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { productId } = req.query;

  if (req.method === "DELETE") {
    try {
      const deleteProduct = await prisma.product.delete({
        where: {
          id: productId as string,
        },
      });

      res.status(200).json({ message: "Product has been deleted" });
    } catch (error) {
      res
        .status(400)
        .json({
          message: "Product doesn't exist in database. Please refresh page!",
        });
    }
  }
}
