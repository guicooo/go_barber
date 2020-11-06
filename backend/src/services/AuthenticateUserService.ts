import { compare } from "bcryptjs";
import { getRepository } from "typeorm";
import User from "../models/User";

interface Request {
  email: string,
  password: string
}
class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<{ user: User }> {

    const userRepository = getRepository(User)

    const user = await userRepository.findOne({ where: { email } })

    if(!user) {
      throw Error('Incorrect email / password combination')
    }

    const passwordMatched = await compare(password, user.password)

    if(!passwordMatched) {
      throw Error('Incorrect email / password combination')
    }

    //USUARIO AUTENTICADO
    return {
      user
    }

  }
}

export default AuthenticateUserService;
