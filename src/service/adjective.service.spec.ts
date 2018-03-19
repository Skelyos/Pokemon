import { TestBed, inject } from '@angular/core/testing';

import { AdjectiveService } from './adjective.service';

describe('AdjectiveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdjectiveService]
    });
  });

  it('should be created', inject([AdjectiveService], (service: AdjectiveService) => {
    expect(service).toBeTruthy();
  }));
});
