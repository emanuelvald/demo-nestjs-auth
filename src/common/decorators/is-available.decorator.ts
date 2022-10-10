import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../../user/user.service';
import { Injectable } from '@nestjs/common';

export function IsAvailable(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isAvailable',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [`Unique ${property} Rule`],
      validator: IsAvailableConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'isAvailable', async: true })
@Injectable()
export class IsAvailableConstraint implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(value: string, args: ValidationArguments) {
    return await this.userService.userExists(args.property, value);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.constraints[0]}: ${args.property} is already in use.`;
  }
}
