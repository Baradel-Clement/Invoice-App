import { createInvoice, deleteInvoice, editInvoice, markAsPaidInvoice } from "../../prisma/invoice";
import { getSession } from "next-auth/react";


export const getInvoices = async (userId) => {
  /* const invoices = await prisma.invoice.findMany({});
  return invoices; */
  const invoices = await prisma.invoice.findMany({
    where: {
      userId,
    },
  });
  return invoices;
}


export default async function handle(req, res) {
  // Get the current session data with {user, email, id}
  const session = await getSession({ req });

  try {
    switch (req.method) {
      case 'GET':
        const invoices = await getInvoices(session.user.id)
        return res.json(invoices)
      case 'POST':
        const newInvoice = await createInvoice(req.body, session);
        return res.json(newInvoice);
      case 'PUT':
        let invoice;
        if (req.body.changeOnlyStatus === true) {
          invoice = await markAsPaidInvoice(req.body, session);
        }
        else {
          invoice = await editInvoice(req.body, session);
        }
        return res.json(invoice);
      case 'DELETE':
        const invoiceDeleted = await deleteInvoice(req.body, session.user.id);
        return res.json(invoiceDeleted);
      default:
        break;
    }
  } catch (error) {
    return res.status(500).json({ ...error, message: error.message })
  }
}