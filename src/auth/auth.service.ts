import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  // TODO: Use bcrypt, just doing plaintext to get general idea for now.
  async validateUsers(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findUser({ email: email });
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
