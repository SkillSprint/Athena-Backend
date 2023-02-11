import { Test, TestingModule } from "@nestjs/testing";
import { users } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { UsersService } from "./users.service";

const userArray = <users[]>[
  {
    id: 1,
    email: "test@email.com",
    identiKey: "test1",
    first_name: "test",
    last_name: "account",
    created_at: expect.any(Date),
    password: "test",
    isStaff: false,
  },
  {
    id: 2,
    email: "test2@email.com",
    identiKey: "test2",
    first_name: "test",
    last_name: "account",
    created_at: expect.any(Date),
    password: "test",
    isStaff: false,
  },
  {
    id: 3,
    email: "test3@email.com",
    identiKey: "test3",
    first_name: "test",
    last_name: "account",
    created_at: expect.any(Date),
    password: "test",
    isStaff: true,
  },
];

describe("UsersService", () => {
  let service: UsersService;

  const db = {
    users: {
      findUnique: jest.fn().mockResolvedValue(userArray[0]),
      create: jest.fn().mockReturnValue(userArray[1]),
      update: jest.fn().mockResolvedValue(userArray[1]),
      delete: jest.fn().mockResolvedValue(userArray[2]),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return single user data", async () => {
    expect(await service.findUser({ email: userArray[0].email })).toEqual(
      userArray[0],
    );
  });

  it("should create a user and return data", async () => {
    expect(
      await service.createUser({
        email: userArray[1].email,
        password: userArray[1].password,
        identiKey: userArray[1].identiKey,
        first_name: userArray[1].first_name,
        last_name: userArray[1].last_name,
        isStaff: userArray[1].isStaff,
      }),
    ).toEqual(userArray[1]);
  });

  it("should update user user and return data", async () => {
    expect(
      await service.updateUser(
        { email: userArray[1].email },
        { first_name: "test3" },
      ),
    ).toEqual(userArray[1]);
  });

  it("should delete user from", async () => {
    expect(await service.deleteUser(userArray[2])).toEqual(userArray[2]);
  });
});
