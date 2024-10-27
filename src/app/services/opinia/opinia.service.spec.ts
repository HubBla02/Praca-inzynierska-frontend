import { TestBed } from '@angular/core/testing';

import { OpiniaService } from './opinia.service';

describe('OpiniaService', () => {
  let service: OpiniaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpiniaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
