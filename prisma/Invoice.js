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
export const createInvoice = async (total, session) => {
  const newInvoice = await prisma.invoice.create({
    data: {
      total,
      user: { connect: { email: session?.user?.email } }, // Connect the new invoice to an existing User with the email provided
    },
  });
  const invoice = await getInvoiceById(newInvoice.id);
  return invoice;
}