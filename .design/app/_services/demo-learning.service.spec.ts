import { TestBed } from '@angular/core/testing';

import { DemoLearningService } from './demo-learning.service';

describe('DemoLearningService', () => {
  let service: DemoLearningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemoLearningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
