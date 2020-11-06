import { Router } from "express";
import CreateUsersService from "../services/CreateUsersService";


const usersRouter = Router();



usersRouter.post('/', async (request, response) => {
  try {
    const { name, password, email } = request.body

    const createUser = new CreateUsersService();

    const user = await createUser.execute({
      name,
      password,
      email
    })
    delete user.password;

    return response.json(user)

  } catch (error) {
    return response.status(400).json({ error: error.message})
  }
})

export default usersRouter;
