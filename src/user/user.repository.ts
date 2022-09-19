import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel('user') private userModel: Model<UserDocument>) {}

  async createUser(username: string, hashedPassword: string): Promise<User> {
    return await this.userModel.create({
      username: username,
      password: hashedPassword,
    });
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUser(username: string): Promise<User> {
    return this.userModel.findOne({ username: username });
  }
}
