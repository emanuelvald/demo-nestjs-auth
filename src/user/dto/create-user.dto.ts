import {
  IsBoolean,
  IsEmail,
  IsLowercase,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsUsername } from '../../common/decorators/is-username.decorator';
import { IsEqualTo } from '../../common/decorators/is-equal-to.decorator';
import { IsAvailable } from '../../common/decorators/is-available.decorator';

export class CreateUserDto {
  @IsUsername()
  @IsAvailable('username')
  username: string;

  @IsEmail(
    {},
    {
      message: 'Please fill a valid email address.',
    },
  )
  @IsLowercase()
  @IsNotEmpty()
  @IsAvailable('email')
  email: string;

  @IsEqualTo('email')
  confirmEmail: string;

  @IsString()
  @MinLength(8, {
    message: 'Password is shorter than the minimum allowed length (8)',
  })
  @MaxLength(30, {
    message: 'Password is higher than the maximum allowed length (30)',
  })
  @IsNotEmpty()
  password: string;

  @IsEqualTo('password')
  confirmPassword: string;

  @IsBoolean()
  @IsOptional()
  active: boolean;
}
