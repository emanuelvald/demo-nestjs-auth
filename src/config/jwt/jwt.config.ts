import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  jwt_secret: process.env.JWT_SECRET,
  jwt_expires: process.env.JWT_EXPIRES,
}));