import { TestBed, async, inject } from '@angular/core/testing';

import { AuthoritiesGuard } from './authorities.guard';

describe('AuthoritiesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthoritiesGuard]
    });
  });

  it('should ...', inject([AuthoritiesGuard], (guard: AuthoritiesGuard) => {
    expect(guard).toBeTruthy();
  }));
});
