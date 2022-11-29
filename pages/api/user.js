import prisma from "../../lib/prisma";
prisma = new PrismaClient();

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


export default async function handle(req, res) {
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
  } catch(err) {
    return res.status(500).json({ ...err, message: err.message})
  }
}