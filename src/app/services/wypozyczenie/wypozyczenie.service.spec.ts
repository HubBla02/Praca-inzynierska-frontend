import { TestBed } from '@angular/core/testing';

import { WypozyczenieService } from './wypozyczenie.service';

describe('WypozyczenieService', () => {
  let service: WypozyczenieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WypozyczenieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
