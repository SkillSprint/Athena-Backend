import { Controller, Request, Post, Body } from "@nestjs/common";
import { Get } from "@nestjs/common/decorators";
import { Public } from "src/utils/constants";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/login_user.dto";
import { RegisterUserDto } from "./dto/register_user.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("/login")
  async login(@Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post("/register")
  async register(@Body() userDto: RegisterUserDto) {
    return this.authService.register(userDto);
  }

  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }
}
