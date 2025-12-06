import { Module } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { ConnectionController } from './connection.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [ConnectionController],
  providers: [ConnectionService],
  imports: [DatabaseModule]
})
export class ConnectionModule {}
