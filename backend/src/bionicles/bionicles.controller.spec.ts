import { Test, TestingModule } from '@nestjs/testing';
import { BioniclesController } from './bionicles.controller';
import { RebrickableService } from '../rebrickable/rebrickable.service';
import { HttpModule } from '@nestjs/axios';

describe('BioniclesController', () => {
  let controller: BioniclesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [BioniclesController],
      providers: [RebrickableService],
    }).compile();

    controller = module.get<BioniclesController>(BioniclesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
