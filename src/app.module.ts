import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { PrismaService } from "./prisma.service";
import { UsersModule } from "./users/users.module";
import { UsersService } from "./users/users.service";

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, UsersService, PrismaService],
})
export class AppModule {}
