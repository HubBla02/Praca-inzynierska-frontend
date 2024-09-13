import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { rolaGuard } from './rola.guard';

describe('rolaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => rolaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
