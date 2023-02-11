import { JwtModule, JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { Prisma, users } from "@prisma/client";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";
import { hash } from "bcrypt";
import { LoginUserDto } from "./dto/login_user.dto";
import { RegisterUserDto } from "./dto/register_user.dto";

describe("AuthService", () => {
  let service: AuthService;

  const mockUserService = {
    findUser: jest
      .fn()
      .mockImplementation(async (where: Prisma.usersWhereUniqueInput) => {
        if (where.email === "test@email.com") {
          const hashedPassword = await hash("test", 10);
          return <users>{
            id: 1,
            email: "test@email.com",
            identiKey: "test1234",
            first_name: "test",
            last_name: "account",
            created_at: expect.any(Date),
            password: hashedPassword,
            isStaff: false,
          };
        } else {
          return null;
        }
      }),
    createUser: jest
      .fn()
      .mockImplementation(async (where: Prisma.usersCreateInput) => {
        const hashedPassword = await hash(where.password, 10);
        return <users>{
          id: 1,
          email: "test@email.com",
          identiKey: "test1234",
          first_name: "test",
          last_name: "account",
          created_at: expect.any(Date),
          password: hashedPassword,
          isStaff: false,
        };
      }),
  };

  const mockJwtService = {
    sign: jest.fn().mockImplementation(() => expect.any(String)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: process.env.JWT_ACCESS_SECRET,
          signOptions: { expiresIn: "7d" },
        }),
      ],
      providers: [AuthService, UsersService, JwtService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  const dto: LoginUserDto = { email: "test@email.com", password: "test" };
  it("should verify credentials for correct login", async () => {
    expect(await service.login(dto)).toEqual({
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

  it("should verify credentials for correct login", async () => {
    expect(await service.login(dto)).toEqual({
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

  it("should successfully register an account", async () => {
    const dto: RegisterUserDto = {
      email: "test@email.com",
      identiKey: "test1234",
      first_name: "test",
      last_name: "account",
      password: "password",
      isStaff: false,
    };
    expect(await service.register(dto)).toEqual({
      message: "User succesfully created!",
    });
  });
});
