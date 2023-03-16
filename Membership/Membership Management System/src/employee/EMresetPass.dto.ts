import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPassDto {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
