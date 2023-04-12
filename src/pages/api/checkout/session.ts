const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

import { NextApiRequest, NextApiResponse } from "next";

import { routes } from "../../../../routes/routes";

export default async function Session(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const allProducts = req.body;

    try {
      const session = await stripe.checkout.sessions.create({
        line_items: allProducts,
        mode: "payment",
        success_url: `http://localhost:3000${routes.success}`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.status(200).json(session);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
