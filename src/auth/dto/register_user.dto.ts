import { IsEmail, IsNotEmpty } from "class-validator";

export class RegisterUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  identiKey: string;

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  isStaff: boolean;
}
