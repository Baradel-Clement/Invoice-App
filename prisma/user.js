import prisma from './prisma';

export const getAllUser = async () => {
  const users = await prisma.invoice.findMany({});
  return users;
}

export const getUser = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id }
  })
  return user;
}
