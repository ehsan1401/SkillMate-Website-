import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './User/users/users.module';
import { AuthModule } from './auth/auth.module';
import { UserInfoModule } from './User/user-info/user-info.module';
import { UserActionModule } from './User/user-action/user-action.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PeoplesModule } from './peoples/peoples.module';
import { ConnectionModule } from './Connections/connection/connection.module';

@Module({
  imports: [
    UsersModule, DatabaseModule, AuthModule, UserInfoModule,
    UserActionModule, NotificationsModule, PeoplesModule, ConnectionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
