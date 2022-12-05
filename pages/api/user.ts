import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export const getAllUsers = async () => {
  const users = await prisma.user.findMany({});
  return users;
}

export const getUser = async (id: any) => {
  const user = await prisma.user.findUnique({
    where: { id }
  })
  return user;
}


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        if (req.query.id) {
          const user = await getUser(req.query.id)
          return res.status(200).json(user)
        } else {
          const users = await getAllUsers();
          return res.json(users)
        }
      default:
        break;
    }
  } catch(err: any) {
    return res.status(500).json({ message: err.message})
  }
}