import { Module } from '@nestjs/common';
import { UserActionService } from './user-action.service';
import { UserActionController } from './user-action.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserActionController],
  providers: [UserActionService],
})
export class UserActionModule {}
