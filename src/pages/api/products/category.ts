import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../server/db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  }
}
