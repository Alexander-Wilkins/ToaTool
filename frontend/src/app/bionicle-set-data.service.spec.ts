import { TestBed } from '@angular/core/testing';

import { BionicleSetDataService } from './bionicle-set-data.service';

describe('BionicleSetDataService', () => {
  let service: BionicleSetDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BionicleSetDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
