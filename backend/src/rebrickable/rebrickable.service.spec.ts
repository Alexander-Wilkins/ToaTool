import { Test, TestingModule } from '@nestjs/testing';
import { RebrickableService } from './rebrickable.service';
import { HttpModule } from '@nestjs/axios';

describe('RebrickableService', () => {
  let service: RebrickableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [RebrickableService],
    }).compile();

    service = module.get<RebrickableService>(RebrickableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
