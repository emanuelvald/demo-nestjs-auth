import { ConfigService, registerAs } from '@nestjs/config';

export default registerAs('mongodb', () => {
  const configService: ConfigService<Record<string, any>> = new ConfigService();
  return {
    mongodb_uri: configService.get('MONGODB_URI'),
  };
});
