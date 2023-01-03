import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  readonly fullName: string;

  @IsEmail()
  readonly email: string;

  readonly isDeleted: boolean;
}
