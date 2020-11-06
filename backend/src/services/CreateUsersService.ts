import { getRepository } from "typeorm";
import User from "../models/User";

import { hash } from "bcryptjs"

interface Request {
  name: string,
  password: string,
  email: string
}

class CreateUsersService {
  public async execute({ name, email, password }: Request): Promise<User> {

    const usersRepository = getRepository(User);

    const checkEmailUsers = await usersRepository.findOne({
      where: { email },
    })

    if(checkEmailUsers) {
      throw new Error('Email adress already used.')
    }

    const rashedPassword = await hash(password, 8)

    const user = usersRepository.create({
      name,
      email,
      password: rashedPassword
    })

    await usersRepository.save(user)

    return user
  }

}

export default CreateUsersService;
