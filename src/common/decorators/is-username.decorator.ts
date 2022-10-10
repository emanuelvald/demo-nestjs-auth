import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isUsernameValid } from '../../user/user.utils';

export function IsUsername(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isUsername',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: ['Username Rule'],
      validator: IsUsernameConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'isUsername' })
export class IsUsernameConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return isUsernameValid(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} is required. Must be between 6 and 16 characters long and only have lowercase Letters (a-z), numbers (0-9), dots (.) or underscores (_).`;
  }
}
