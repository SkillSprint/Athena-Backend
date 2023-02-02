import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Prisma, users } from "@prisma/client";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUser(where: Prisma.usersWhereUniqueInput): Promise<users | null> {
    return this.prisma.users.findUnique({ where });
  }

  async createUser(data: Prisma.usersCreateInput): Promise<users> {
    return await this.prisma.users.create({ data });
  }

  async updateUser(
    where: Prisma.usersWhereUniqueInput,
    data: Prisma.usersUpdateInput,
  ): Promise<users> {
    return await this.prisma.users.update({
      where,
      data,
    });
  }

  async deleteUser(where: Prisma.usersWhereUniqueInput) {
    return await this.prisma.users.delete({ where });
  }
}
