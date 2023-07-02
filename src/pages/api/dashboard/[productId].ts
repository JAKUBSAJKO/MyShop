import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../server/db/client";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { productId } = req.query;

  if (req.method === "DELETE") {
    try {
      // find product in base for stripe
      const product = await prisma.product.findUnique({
        where: {
          id: productId as string,
        },
      });

      const productInStripe = await stripe.products.search({
        query: `name~\'${product?.name}\'`,
      });

      const productIdStripe = productInStripe?.data[0].id;

      // delete product from supabase
      const deleteProduct = await prisma.product.delete({
        where: {
          id: productId as string,
        },
      });

      // delete product from stripe
      const deleteProductInStripe = await stripe.products.update(
        productIdStripe,
        {
          active: false,
        }
      );

      console.log(productIdStripe, "<----------------------------------------");

      res.status(200).json({ message: "Product has been deleted" });
    } catch (error) {
      res.status(400).json({
        message: "Product doesn't exist in database. Please refresh page!",
      });
    }
  }
}
