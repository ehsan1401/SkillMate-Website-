import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import type { NewNotificationsTypes, NotificationsTypes } from './dto/type';


@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}
    @Get('All/:id')
    Allnotifications(
      @Param('id', ParseIntPipe) id : number,
      @Query('filter') filter?: NewNotificationsTypes
    ){
      return this.notificationsService.Allnotifications(id , filter)
    }

    @Patch('Seen/:NotifId')
    ChangeSeenStatus(
      @Param('NotifId' , ParseIntPipe) NotifId : number
    ){
      return this.notificationsService.ChangeSeenStatus(NotifId)
    }

    @Get('All/Number/:userId')
    NumberOfNotifications(
      @Param('userId', ParseIntPipe)  userID : number
    ){
      return this.notificationsService.NumberOfNotifications(userID)
    }

    @Delete('DeleteNotification/:NotifId')
    DeleteNotification(
      @Param('NotifId' , ParseIntPipe) NotifId : number
    ){
      return this.notificationsService.DeleteNotifications(NotifId)
    }


}