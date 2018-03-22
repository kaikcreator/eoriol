import { TestBed, inject } from '@angular/core/testing';

import { UniversalInterceptor } from './universal-interceptor.service';

describe('UniversalInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UniversalInterceptor]
    });
  });

  it('should be created', inject([UniversalInterceptor], (service: UniversalInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
