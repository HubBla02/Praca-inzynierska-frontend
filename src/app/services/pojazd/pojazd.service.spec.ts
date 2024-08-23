import { TestBed } from '@angular/core/testing';

import { PojazdService } from './pojazd.service';

describe('PojazdService', () => {
  let service: PojazdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PojazdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
