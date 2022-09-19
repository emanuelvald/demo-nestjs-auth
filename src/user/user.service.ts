import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { UserRepository } from './user.repository';
import { getHashedPassword } from './user.utils';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(username: string, password: string): Promise<User> {
    const hashedPassword = await getHashedPassword(password);

    return await this.userRepository.createUser(username, hashedPassword);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.getAllUsers();
  }
}
