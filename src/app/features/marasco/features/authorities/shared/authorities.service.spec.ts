import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from '../../../core/services/auth.service';

describe('AuthoritiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
  });

  it(
    'should ...',
    inject([AuthService], (service: AuthService) => {
      expect(service).toBeTruthy();
    })
  );
});
