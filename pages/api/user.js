import { getAllUser, getUser } from "../../prisma/user";

export default async function handle(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        if (req.query.id) {
          const user = await getUser(req.query.id)
          return res.status(200).json(user)
        } else {
          const users = await getAllUser();
          return res.status(200).json(users)
        }
        break;

      default:
        break;
    }
  } catch(err) {
    return res.status(500).json({ ...err, message: err.message})
  }
}