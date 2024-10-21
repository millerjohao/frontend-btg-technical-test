import { TestBed } from '@angular/core/testing';

import { LogicAppService } from './logic-app.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LogicAppService', () => {
  let service: LogicAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LogicAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
