import { compare } from "bcryptjs";
import { getRepository } from "typeorm";
import { sign } from 'jsonwebtoken'

import User from "../models/User";
import auth from "../config/auth";

interface Request {
  email: string,
  password: string
}
class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<{ user: User; token: string }> {

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

    const token = sign({}, auth.jwt.subject, {
      subject: user.id,
      expiresIn: auth.jwt.expiresIn
    })
    return {
      user,
      token
    }

  }
}

export default AuthenticateUserService;
