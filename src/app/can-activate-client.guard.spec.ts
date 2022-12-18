import { TestBed } from '@angular/core/testing';

import { CanActivateClientGuard } from './can-activate-client.guard';

describe('CanActivateClientGuard', () => {
  let guard: CanActivateClientGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanActivateClientGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
