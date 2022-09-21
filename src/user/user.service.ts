import { BadRequestException, Injectable } from '@nestjs/common';
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

  async getUserByUsername(username: string): Promise<User> {
    return await this.userRepository.getUser(username);
  }

  async updateUser(
    username: string,
    userDocument: UserDocument,
  ): Promise<User> {
    if (userDocument._id) {
      throw new BadRequestException(`_id can't be updated`);
    }
    if (userDocument.username.length < 6) {
      throw new BadRequestException(
        'username is shorter than the minimum allowed length (6)',
      );
    }
    if (userDocument.password) {
      throw new BadRequestException(`Password can't be updated at this point`);
    }

    return await this.userRepository.updateUser(username, userDocument);
  }
}
