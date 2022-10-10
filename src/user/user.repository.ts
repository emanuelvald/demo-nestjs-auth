import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel('user') private userModel: Model<UserDocument>) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async getUserByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username: username }).catch((error) => {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${error.message}`,
        error: 'Internal Server Error',
      });
    });
  }

  async isEmailAvailable(email: string): Promise<any> {
    return await this.userModel
      .exists({ email: email.toString() })
      .then((result) => {
        return !result;
      })
      .catch((error) => {
        throw new BadRequestException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: [`${error.message}`],
          error: 'Internal Server Error',
        });
      });
  }

  async createUser(newUser: User): Promise<User> {
    return await this.userModel
      .create({
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
      })
      .catch((error) => {
        throw new BadRequestException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: [`${error.message}`],
          error: 'Internal Server Error',
        });
      });
  }

  async updateUser(
    username: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userModel
      .findOneAndUpdate(
        { username: username },
        {
          username: updateUserDto.username,
          email: updateUserDto.email,
          active: updateUserDto.active,
        },
        {
          new: true,
        },
      )
      .select(['username', 'email', 'active'])
      .catch((error) => {
        throw new BadRequestException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
          error: 'Internal Server Error',
        });
      });
  }
}
