import { IsBoolean, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { IsUsername } from '../../common/decorators/is-username.decorator';
import { IsEqualTo } from '../../common/decorators/is-equal-to.decorator';

export class CreateUserDto {
  @IsUsername()
  /*@IsString()
            @IsNotEmpty()
            @MinLength(6, {
              message: 'Username is shorter than the minimum allowed length (6)',
            })
            @MaxLength(15, {
              message: 'Username is higher than maximum allowed length (15)',
            })*/
  username: string;

  @IsNotEmpty()
  @MinLength(8, {
    message: 'Password is shorter than the minimum allowed length (8)',
  })
  password: string;

  @IsEqualTo('password')
  confirmPassword: string;

  @IsBoolean()
  @IsOptional()
  active: boolean;
}
