import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { PrismaService } from "./prisma.service";
import { UsersModule } from "./users/users.module";
import { UsersService } from "./users/users.service";
import { APP_GUARD } from "@nestjs/core";

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [],
  providers: [
    UsersService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
