import { Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';


@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}
    @Get('All/:id')
    Allnotifications(
      @Param('id', ParseIntPipe) id : number
    ){
      return this.notificationsService.Allnotifications(id)
    }

    @Patch('Seen/:NotifId')
    ChangeSeenStatus(
      @Param('NotifId' , ParseIntPipe) NotifId : number
    ){
      return this.notificationsService.ChangeSeenStatus(NotifId)
    }


}