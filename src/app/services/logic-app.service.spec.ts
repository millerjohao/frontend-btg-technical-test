import { TestBed } from '@angular/core/testing';

import { LogicAppService } from './logic-app.service';

describe('LogicAppService', () => {
  let service: LogicAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogicAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
