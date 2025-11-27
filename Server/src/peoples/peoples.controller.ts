import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PeoplesService } from './peoples.service';

@Controller('peoples')
export class PeoplesController {
  constructor(private readonly peoplesService: PeoplesService) {}
  @Get('PeopleInfo/:id')
  GetPeopleInformation(
    @Param('id') peopleUsername : string
  ){
    return this.peoplesService.GetPeopleInformation(peopleUsername)
  }
}
