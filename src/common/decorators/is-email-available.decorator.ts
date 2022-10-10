import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../../user/user.service';
import { Injectable } from '@nestjs/common';

export function IsEmailAvailable(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isEmailAvailable',

      target: object.constructor,
      propertyName: propertyName,

      options: validationOptions,
      constraints: ['Unique Email Rule'],
      validator: IsEmailAvailableConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'isEmailAvailable', async: true })
@Injectable()
export class IsEmailAvailableConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly userService: UserService) {}

  async validate(value: string, args: ValidationArguments) {
    return await this.userService.userExists(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `Email ${args.property} is already in use.`;
  }
}
