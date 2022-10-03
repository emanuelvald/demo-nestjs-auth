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
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('jwt.jwt_secret'),
        signOptions: { expiresIn: configService.get('jwt.jwt_expires') },
      }),
    }),
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
  ],
  providers: [AuthService, UserService, UserRepository, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
