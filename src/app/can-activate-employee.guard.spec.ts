import { TestBed } from '@angular/core/testing';

import { CanActivateEmployeeGuard } from './can-activate-employee.guard';

describe('CanActivateEmployeeGuard', () => {
  let guard: CanActivateEmployeeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanActivateEmployeeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
