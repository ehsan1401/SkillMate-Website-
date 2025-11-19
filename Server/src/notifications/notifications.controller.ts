import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import type { NotificationsTypes } from './dto/type';


@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}
    @Get('All/:id')
    Allnotifications(
      @Param('id', ParseIntPipe) id : number,
      @Query('type') type?: NotificationsTypes
    ){
      return this.notificationsService.Allnotifications(id , type)
    }

    @Patch('Seen/:NotifId')
    ChangeSeenStatus(
      @Param('NotifId' , ParseIntPipe) NotifId : number
    ){
      return this.notificationsService.ChangeSeenStatus(NotifId)
    }


}