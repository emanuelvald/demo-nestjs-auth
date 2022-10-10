import { hash } from 'bcrypt';
import { BadRequestException, HttpStatus } from '@nestjs/common';
import {
  saltOrRounds,
  usernameMaxLength,
  usernameMinLength,
  usernamePattern,
} from './user.constants';

export function isUsername(username: string): boolean {
  if (!username) {
    return false;
  }

  if (!!username && !usernamePattern.test(username)) {
    return false;
  }

  if (!!username && username.length < usernameMinLength) {
    return false;
  }

  if (!!username && username.length > usernameMaxLength) {
    return false;
  }

  return true;
}

export async function getHashedPassword(password: string): Promise<string> {
  return await hash(password, saltOrRounds).catch((error) => {
    throw new BadRequestException({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: [`${error.message}`],
      error: 'Internal Server Error',
    });
  });
}
