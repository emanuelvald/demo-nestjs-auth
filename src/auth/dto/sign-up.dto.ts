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
import {
  passwordMaxLength,
  passwordMinLength,
} from '../../user/user.constants';

export class SignUpDto {
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
  @MinLength(passwordMinLength, {
    message: `Password is shorter than the minimum allowed length ${passwordMinLength}`,
  })
  @MaxLength(passwordMaxLength, {
    message: `Password is higher than the maximum allowed length ${passwordMaxLength}`,
  })
  @IsNotEmpty()
  password: string;

  @IsEqualTo('password')
  confirmPassword: string;

  @IsBoolean()
  @IsOptional()
  active: boolean;
}
