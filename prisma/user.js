import prisma from './prisma';

export const getAllUsers = async () => {
  const users = await prisma.user.findMany({});
  return users;
}

export const getUser = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id }
  })
  return user;
}
