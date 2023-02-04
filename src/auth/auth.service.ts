import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { RegisterUserDto } from "./dto/register_user.dto";
import { compareSync, hash } from "bcrypt";
import {
  BadRequestException,
  UnauthorizedException,
} from "@nestjs/common/exceptions";
import { LoginUserDto } from "./dto/login_user.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // TODO: Use bcrypt, just doing plaintext to get general idea for now.
  async validateUsers(userDto: LoginUserDto) {
    const user = await this.usersService.findUser(userDto);
    if (user && user.password === userDto.password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    } else if (!user) {
      throw new BadRequestException("Login Authentication Failed.", {
        cause: new Error(),
        description: "Username not found.",
      });
    }
    throw new BadRequestException("Login Authentication Failed", {
      cause: new Error(),
      description: "Passwords did not match.",
    });
  }

  async login(payload: LoginUserDto) {
    const user = await this.usersService.findUser({ email: payload.email });
    if (!user) {
      throw new UnauthorizedException({
        message: "Invalid credentials",
        error: "Unable to find user.",
        statusCode: 401,
      });
    }
    const hashedPassword = await compareSync(payload.password, user.password);
    if (!hashedPassword) {
      throw new UnauthorizedException({
        message: "Invalid credentials",
        error: "Invalid password. Please try again.",
        statusCode: 401,
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    return {
      user: result,
      access_token: this.jwtService.sign({ sub: user.id, ...user }),
    };
  }

  async register(payload: RegisterUserDto) {
    const { password } = payload;

    // Hash the password using bcrypt
    const hashedPassword = await hash(password, 10);

    // Replace the plain text password with the hashed password
    payload.password = hashedPassword;

    // Save the user in the database
    await this.usersService.createUser(payload);

    return { message: "User succesfully created!" };
  }
}
