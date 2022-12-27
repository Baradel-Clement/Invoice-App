import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";

// READ 
// get unique invoice by id
export const getInvoiceById = async (id: string) => {
  const invoice = await prisma.invoice.findMany({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });
  return invoice;
}

export const getInvoices = async (userId: string) => {
  const invoices = await prisma.invoice.findMany({
    where: {
      userId,
    },
  });
  return invoices;
}

// CREATE
export const createInvoice = async (reqBody: any, session: any) => {
  const newInvoice = await prisma.invoice.create({
    data: {
      displayId: reqBody.displayId,
      personalStreetAdress: reqBody.personalStreetAdress,
      personalCity: reqBody.personalCity,
      personalPostCode: reqBody.personalPostCode,
      personalCountry: reqBody.personalCountry,
      clientName: reqBody.clientName,
      clientEmail: reqBody.clientEmail,
      clientStreetAdress: reqBody.clientStreetAdress,
      clientCity: reqBody.clientCity,
      clientPostCode: reqBody.clientPostCode,
      clientCountry: reqBody.clientCountry,
      invoiceDate: reqBody.invoiceDate,
      paymentTerms: reqBody.paymentTerms,
      description: reqBody.description,
      items: reqBody.items,
      total: reqBody.total,
      status: reqBody.status,
      user: { connect: { email: session?.user?.email } }, // Connect the new invoice to an existing User with the email provided
    },
  });
  const invoice = await getInvoiceById(newInvoice.id);
  return invoice;
}

// UPDATE
export const editInvoice = async (reqBody: any, session: any) => {
  const updateInvoice = await prisma.invoice.update({
    where: {
      id: reqBody.id,
    },
    data: {
      personalStreetAdress: reqBody.personalStreetAdress,
      personalCity: reqBody.personalCity,
      personalPostCode: reqBody.personalPostCode,
      personalCountry: reqBody.personalCountry,
      clientName: reqBody.clientName,
      clientEmail: reqBody.clientEmail,
      clientStreetAdress: reqBody.clientStreetAdress,
      clientCity: reqBody.clientCity,
      clientPostCode: reqBody.clientPostCode,
      clientCountry: reqBody.clientCountry,
      invoiceDate: reqBody.invoiceDate,
      paymentTerms: reqBody.paymentTerms,
      description: reqBody.description,
      items: reqBody.items,
      total: reqBody.total,
      status: reqBody.status,
      user: { connect: { email: session?.user?.email } }, // Connect the new invoice to an existing User with the email provided
    },
  });
  const invoice = await getInvoiceById(updateInvoice.id);
  return invoice;
}

export const markAsPaidInvoice = async (id: string, status: string) => {
  const markAsPaidInvoice = await prisma.invoice.update({
    where: {
      id: id,
    },
    data: {
      status: status
    },
  });
  
  const invoicePaid = await getInvoiceById(markAsPaidInvoice.id);
  return invoicePaid;
}

// DELETE
export const deleteInvoice = async (invoiceId: string) => {
  const deleteInvoice = await prisma.invoice.delete({
    where: {
      id: invoiceId,
    },
  })
  return deleteInvoice;
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  // Get the current session data with {user, email, id}
  const session = await getSession({ req });

  try {
    switch (req.method) {
      case 'GET':
        const invoices = await getInvoices(session?.user.id)
        return res.json(invoices)
      case 'POST':
        const newInvoice = await createInvoice(req.body, session);
        return res.json(newInvoice);
      case 'PUT':
        let invoice;
        if (req.body.changeOnlyStatus === true) {
          invoice = await markAsPaidInvoice(req.body.id, req.body.status);
        }
        else {
          invoice = await editInvoice(req.body.invoiceId, session);
        }
        return res.json(invoice);
      case 'DELETE':
        const invoiceDeleted = await deleteInvoice(req.body.invoiceId);
        return res.json(invoiceDeleted);
      default:
        break;
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}