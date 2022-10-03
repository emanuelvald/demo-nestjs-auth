import { registerAs } from '@nestjs/config';

export default registerAs('mongodb', () => ({
  mongodb_uri: process.env.MONGODB_URI,
}));