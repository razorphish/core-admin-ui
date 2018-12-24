import { TestBed, inject } from '@angular/core/testing';

import { AuthoritiesService } from './authorities.service';

describe('AuthoritiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthoritiesService]
    });
  });

  it(
    'should ...',
    inject([AuthoritiesService], (service: AuthoritiesService) => {
      expect(service).toBeTruthy();
    })
  );
});
