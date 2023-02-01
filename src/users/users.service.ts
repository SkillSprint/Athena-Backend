import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Prisma, users } from "@prisma/client";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUser(
    userWhereUniqueInput: Prisma.usersWhereUniqueInput,
  ): Promise<users | null> {
    return this.prisma.users.findUnique({
      where: userWhereUniqueInput,
    });
  }
}
