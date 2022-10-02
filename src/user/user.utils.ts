import { hash } from 'bcrypt';
import { BadRequestException, HttpStatus } from '@nestjs/common';

export const saltOrRounds = 10;

export function isUsernameValid(username: string): boolean {
  return /^[a-z0-9_.]+$/.test(username);
}

export async function getHashedPassword(password: string): Promise<string> {
  return await hash(password, saltOrRounds).catch((error) => {
    throw new BadRequestException({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: `${error.message}`,
      error: 'Internal Server Error',
    });
  });
}
