import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDocument } from './user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  createUser(@Body() createUser: UserDocument) {
    const { username, password } = createUser;
    return this.userService.createUser(username, password);
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }
}
