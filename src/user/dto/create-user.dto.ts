import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: 'Username is shorter than the minimum allowed length (6)',
  })
  @MaxLength(15, {
    message: 'Username is higher than maximum allowed length (15)',
  })
  username: string;

  @IsNotEmpty()
  @MinLength(8, {
    message: 'Password is shorter than the minimum allowed length (8)',
  })
  password: string;

  @IsBoolean()
  @IsOptional()
  active: boolean;
}
