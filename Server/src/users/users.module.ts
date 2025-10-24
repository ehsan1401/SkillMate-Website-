import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService , JwtStrategy],
  controllers: [UsersController],
})
export class UsersModule {}
