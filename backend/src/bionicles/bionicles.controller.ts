import { Controller, Get, Query } from '@nestjs/common';
import { RebrickableService } from '../rebrickable/rebrickable.service';

@Controller('bionicles')
export class BioniclesController {
  constructor(private rebrickableService: RebrickableService) {}

  @Get()
  findAll(@Query('year') year: string) {
    return this.rebrickableService.findAll(year);
  }

  @Get('set')
  async findOne(@Query('id') id: string, @Query('year') year: string) {
    return this.rebrickableService.findOneSet(id, year);
  }

  @Get('search')
  findSpecificBionicle(@Query('q') q: string) {
    return this.rebrickableService.findSpecificBionicle(q);
  }
}
