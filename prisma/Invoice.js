import prisma from "./prisma";

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