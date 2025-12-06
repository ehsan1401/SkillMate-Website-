import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { AcceptSyncConnectionDTO, SyncRequest } from './dto/Connections.dto';


@Controller('connection')
export class ConnectionController {
  constructor(private readonly connectionService: ConnectionService) {}


  @Post('/Sync')
  SyncUserToAnother(
    @Body() SyncBody : SyncRequest 
  ){
    return this.connectionService.SyncUserToAnother(SyncBody);
  }

  @Post('/Sync/AcceptSync')
  AcceptSyncUserToAnother(
    @Body() AcceptSyncBody : {ConnectionID : number , NotifId : number}

  ){
    return this.connectionService.AcceptSyncUserToAnother(AcceptSyncBody)
  }
}
