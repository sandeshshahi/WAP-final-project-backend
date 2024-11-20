import { getAllUsers } from "../services/user.service";

export const getAllUsersController = async (req: Request, res) => {
  try {
    const users = await getAllUsers();
    const data = users?.map((user) => {
      const newUser = {
        ...user,
      };
      delete newUser.password;
      return newUser;
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching users." });
  }
};