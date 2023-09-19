import { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const balance = await stripe.balance.retrieve();
      res.status(200).json({ balance });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Wystąpił błąd podczas pobierania salda." });
    }
  }
}
