import { IsBoolean, IsEmail, IsLowercase, IsOptional } from 'class-validator';
import { IsUsername } from '../../common/decorators/is-username.decorator';

export class UpdateUserDto {
  @IsUsername()
  @IsOptional()
  username: string;

  @IsEmail(
    {},
    {
      message: 'Please fill a valid email address.',
    },
  )
  @IsOptional()
  @IsLowercase()
  email: string;

  @IsBoolean()
  @IsOptional()
  active: boolean;
}
