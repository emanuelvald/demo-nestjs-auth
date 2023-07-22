import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { SignUpDto } from './dto/sign-up.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(signUpDto: SignUpDto) {
    const user: CreateUserDto = new CreateUserDto();
    user.username = signUpDto.username;
    user.email = signUpDto.email;
    user.password = signUpDto.password;

    return await this.userService.createUser(user);
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getUserByUsername(username);

    if (!user) {
      throw new NotAcceptableException('Username or password are incorrect.');
    }

    const passwordValid = await compare(password, user.password);

    if (!passwordValid) {
      throw new NotAcceptableException('Username or password are incorrect.');
    }

    return user;
  }
}
