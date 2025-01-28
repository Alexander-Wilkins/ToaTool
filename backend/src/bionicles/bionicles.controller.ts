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
    ) {
        const setDetails = await this.rebrickableService.findOne(id);
        const pieces = await this.rebrickableService.getPiecesBySetIdNumber(id);
        const combinedData = {
            ...setDetails,
            pieces: pieces,
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
