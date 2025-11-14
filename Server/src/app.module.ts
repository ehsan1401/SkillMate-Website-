import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UserInfoModule } from './user-info/user-info.module';
import { UserActionModule } from './user-action/user-action.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    UsersModule, DatabaseModule, AuthModule, UserInfoModule,
    UserActionModule, NotificationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
