import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Prisma } from "@prisma/client";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // TODO: Use bcrypt, just doing plaintext to get general idea for now.
  async validateUsers(email: string, pass: string) {
    const user = await this.usersService.findUser({ email: email });
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
    // else if (!user) {
    //   throw new BadRequestException("Login Authentication Failed.", {
    //     cause: new Error(),
    //     description: "Username not found.",
    //   });
    // }
    // throw new BadRequestException("Login Authentication Failed", {
    //   cause: new Error(),
    //   description: "Passwords did not match.",
    // });
  }

  async login(payload: Prisma.usersWhereUniqueInput) {
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
