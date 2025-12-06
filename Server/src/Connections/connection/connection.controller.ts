import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { SyncRequest } from './dto/Connections.dto';


@Controller('connection')
export class ConnectionController {
  constructor(private readonly connectionService: ConnectionService) {}


  @Post('/Sync/')
  SyncUserToAnother(
    @Body() SyncBody : SyncRequest 
  ){
    return this.connectionService.SyncUserToAnother(SyncBody);
  }
}
