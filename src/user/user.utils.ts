import { hash } from 'bcrypt';

export const saltOrRounds = 10;

export function isUserNameValid(username: string): boolean {
  /*
    Usernames can only have:
    - Lowercase Letters (a-z)
    - Numbers (0-9)
    - Dots (.)
    - Underscores (_)
  */
  const res = /^[a-z0-9_.]+$/.exec(username);
  return !!res;
}

export async function getHashedPassword(password: string): Promise<string> {
  return await hash(password, saltOrRounds);
}
