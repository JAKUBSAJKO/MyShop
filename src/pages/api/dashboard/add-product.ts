import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../server/db/client";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, description, price, quantity, image } = req.body;

    // Step 1: Create product in Stripe
    const newProduct = await stripe.products.create({
      name,
      description,
      images: [image],
    });

    // Step 2: Create price for product
    const newPrice = await stripe.prices.create({
      unit_amount: price * 100,
      currency: "pln",
      product: newProduct.id,
    });

    res.status(200).json({ mess: "good" });

    // const newProduct = await prisma.product.create({
    //   data: {},
    // });
  }
}
