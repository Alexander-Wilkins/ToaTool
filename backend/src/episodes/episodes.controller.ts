import { Body, Controller, DefaultValuePipe, Get, NotFoundException, Param, ParseIntPipe, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { IsPositivePipe } from './pipes/is-positive.pipe';
import { ApiKeyGuard } from './guards/api-key.guard';


@Controller('episodes')
export class EpisodesController {
  constructor(
    private episodesService: EpisodesService,
  ) {}

  // http://localhost:3000/episodes?sort=asc
  @Get()
  findall(
    @Query('sort') sort: 'asc' | 'desc' = 'desc', 
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe, IsPositivePipe) limit: number
) { 
    return this.episodesService.findall(sort);
  }

  // http://localhost:3000/episodes/featured
  @Get('featured')
  findFeatured() {
    return this.episodesService.findFeatured();
  }

  // http://localhost:3000/episodes/1
  // http://localhost:3000/episodes/blah
  @Get(':id')
  async findOne(@Param('id') id: string) {
    console.log(id);
    const episode = await this.episodesService.findOne(id);
    if (!episode) {
      throw new NotFoundException('Episode not found');
    }
    return episode;
  }

  // POST http://localhost:3000/episodes
  @UseGuards(ApiKeyGuard)
  @Post()
  create(@Body(ValidationPipe) input: CreateEpisodeDto) {
    return this.episodesService.create(input);
  }
}
