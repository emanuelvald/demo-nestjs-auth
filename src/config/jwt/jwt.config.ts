import { ConfigService, registerAs } from '@nestjs/config';

export default registerAs('jwt', () => {
  const configService: ConfigService<Record<string, any>> = new ConfigService();
  return {
    jwt_secret: configService.get('JWT_SECRET'),
    jwt_expires: configService.get('JWT_EXPIRES'),
  };
});
