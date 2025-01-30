import { Controller, Get, Query } from '@nestjs/common';
import { RebrickableService } from '../rebrickable/rebrickable.service';

@Controller('bionicles')
export class BioniclesController {
    constructor(
        private rebrickableService: RebrickableService,
    ) {}

    @Get()
    findAll(
        @Query('year') year: string,
    ) {
        return this.rebrickableService.findAll(year);
    }

    @Get('set')
    async findOne(
        @Query('id') id: string,
        @Query('year') year: string,
    ) {
        const setDetails = await this.rebrickableService.findOne(id, year);
        const pieces = await this.rebrickableService.getPiecesBySetIdNumber(id);
        const combinedData = {
            ...setDetails,
            pieces: pieces,
            year: year,
        };
        return combinedData;
    }

    @Get('pieces')
    findPieces(
        @Query('id') id: string,
    ) {
        return this.rebrickableService.getPiecesBySetIdNumber(id);
    }

}
