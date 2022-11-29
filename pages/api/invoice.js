import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";

// READ 
// get unique invoice by id
export const getInvoiceById = async (id) => {
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

// CREATE
export const createInvoice = async (reqBody, session) => {
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
export const editInvoice = async (reqBody, session) => {
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

export const markAsPaidInvoice = async (reqBody) => {
  const markAsPaidInvoice = await prisma.invoice.update({
    where: {
      id: reqBody.id,
    },
    data: {
      status: reqBody.status
    },
  });
  
  const invoicePaid = await getInvoiceById(markAsPaidInvoice.id);
  return invoicePaid;
}

// DELETE
export const deleteInvoice = async (reqBody, userId) => {
  const deleteInvoice = await prisma.invoice.delete({
    where: {
      id: reqBody.invoiceId,
    },
  })
  return deleteInvoice;
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