import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EpisodesModule } from './episodes/episodes.module';
import { BioniclesModule } from './bionicles/bionicles.module';
import { ConfigModule } from '@nestjs/config';
import { RebrickableService } from './rebrickable/rebrickable.service';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [ConfigModule.forRoot(), EpisodesModule, BioniclesModule, HttpModule],
  controllers: [AppController],
  providers: [AppService, RebrickableService],
})
export class AppModule {}
