import {
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/login_user.dto";
import { RegisterUserDto } from "./dto/register_user.dto";

describe("AuthController", () => {
  let controller: AuthController;

  const mockAuthService = {
    login: jest.fn().mockImplementation((dto: LoginUserDto) => {
      if (dto.email === "test@email.com" && dto.password === "test") {
        return Promise.resolve({
          user: {
            id: 1,
            email: dto.email,
            identiKey: "test1234",
            first_name: "test",
            last_name: "account",
            created_at: expect.any(Date),
            isStaff: false,
          },
          access_token: expect.any(String),
        });
      } else if (dto.email !== "test@email.com") {
        return Promise.resolve(
          new BadRequestException({
            message: "Invalid credentials",
            error: "Unable to find user.",
            statusCode: 400,
          }),
        );
      } else {
        return Promise.resolve(
          new BadRequestException({
            message: "Invalid credentials",
            error: "Invalid password. Please try again.",
            statusCode: 401,
          }),
        );
      }
    }),
    register: jest.fn((dto: RegisterUserDto) => {
      if (dto.password === "test") {
        return Promise.resolve({
          message: "Successfully registered user!",
        });
      } else {
        return Promise.resolve(
          new InternalServerErrorException({
            message: "Internal server",
            error: "Unable to register user.",
            statusCode: 500,
          }),
        );
      }
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should return user object and jwt access token on login", async () => {
    const dto: LoginUserDto = { email: "test@email.com", password: "test" };
    expect(await controller.login(dto)).toEqual({
      user: {
        id: 1,
        email: dto.email,
        identiKey: "test1234",
        first_name: "test",
        last_name: "account",
        created_at: expect.any(Date),
        isStaff: false,
      },
      access_token: expect.any(String),
    });
  });

  const dto: RegisterUserDto = {
    email: "test@email.com",
    first_name: "test",
    identiKey: "test1234",
    last_name: "account",
    isStaff: false,
    password: "test",
  };

  const incorrectDto: RegisterUserDto = {
    email: "tes@email.com",
    first_name: "test",
    identiKey: "test1234",
    last_name: "account",
    isStaff: false,
    password: "tes",
  };

  it("should send a confirmation message on successful register", async () => {
    expect(await controller.register(dto)).toEqual({
      message: "Successfully registered user!",
    });
  });

  it("should return an error with wrong email", async () => {
    expect(await controller.login(incorrectDto)).toEqual(
      new BadRequestException({
        message: "Invalid credentials",
        error: "Unable to find user.",
        statusCode: 400,
      }),
    );
  });
});
