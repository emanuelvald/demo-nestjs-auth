import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: 'Username is shorter than the minimum allowed length (6)',
  })
  @MaxLength(15, {
    message: 'Username is higher than maximum allowed length (15)',
  })
  username: string;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  active: boolean;
}
