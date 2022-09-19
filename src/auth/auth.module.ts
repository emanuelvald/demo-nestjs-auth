import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/user.schema';
import { LocalStrategy } from './local.strategy';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
  ],
  providers: [AuthService, UserService, UserRepository, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
