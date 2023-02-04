import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Prisma, users } from "@prisma/client";
import { BadRequestException } from "@nestjs/common/exceptions";
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUser(where: Prisma.usersWhereUniqueInput): Promise<users | null> {
    try {
      return await this.prisma.users.findUnique({ where });
    } catch (error) {
      console.log(error);
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException({
          message: "Login Request Failed.",
          acceptedSchema: {
            id: "number",
            email: "string",
            identiKey: "string",
          },
          error:
            "Did not provide the correct parameters. Please refer to API documentation.",
        });
      }
    }
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
