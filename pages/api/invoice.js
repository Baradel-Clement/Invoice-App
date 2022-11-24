import { createInvoice } from "../../prisma/Invoice";
import { getSession } from "next-auth/react";

export default async function handle(req, res) {
  // Get the current session data with {user, email, id}
  const session = await getSession({ req });

  if (req.method === 'POST') {
    // Get invoice total from the request body
    const { clientCity } = req.body;
    // Create a new invoice
    const newInvoice = await createInvoice(req.body, session);

    return res.json(newInvoice);
  }
}