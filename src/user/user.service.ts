import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './user.schema';
import { UserRepository } from './user.repository';
import { getHashedPassword } from './user.utils';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserBody: UserDocument): Promise<User> {
    const { username, password } = createUserBody;
    const hashedPassword = await getHashedPassword(password);

    return await this.userRepository.createUser(username, hashedPassword);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.getAllUsers();
  }

  async getUser(username: string): Promise<User> {
    return await this.userRepository.getUser(username);
  }
}
