import { hash } from 'bcrypt';

export const saltOrRounds = 10;

export async function getHashedPassword(password: string): Promise<string> {
  return await hash(password, saltOrRounds);
}
