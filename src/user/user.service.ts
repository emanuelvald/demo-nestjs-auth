import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { UserRepository } from './user.repository';
import { getHashedPassword } from './user.utils';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.getAllUsers();
  }

  async getUserByUsername(username: string): Promise<User> {
    return await this.userRepository.getUserByUsername(username);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password } = createUserDto;
    const hashedPassword = await getHashedPassword(password);

    const newUser = new User();
    newUser.username = username;
    newUser.email = email;
    newUser.password = hashedPassword;

    return await this.userRepository.createUser(newUser);
  }

  async updateUser(
    username: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userRepository.updateUser(username, updateUserDto);
  }
}
