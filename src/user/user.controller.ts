import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDocument } from './user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  createUser(@Body() createUserBody: UserDocument) {
    return this.userService.createUser(createUserBody);
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/:username')
  getUserByUsername(@Param('username') username: string) {
    return this.userService.getUserByUsername(username);
  }

  @Patch('/:username')
  updateUser(
    @Param('username') username: string,
    @Body() userDocument: UserDocument,
  ) {
    return this.userService.updateUser(username, userDocument);
  }
}
