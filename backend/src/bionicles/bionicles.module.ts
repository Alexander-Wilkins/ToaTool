import { Module } from '@nestjs/common';
import { BioniclesController } from './bionicles.controller';
import { HttpModule } from '@nestjs/axios';
import { RebrickableService } from '../rebrickable/rebrickable.service';

@Module({
    imports: [HttpModule],
    controllers: [BioniclesController],
    providers: [RebrickableService],
})
export class BioniclesModule {}
