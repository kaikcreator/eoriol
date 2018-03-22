import { TestBed, inject } from '@angular/core/testing';

import { WindowRefService, DocumentRefService } from './globals.service';

describe('WindowRefService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WindowRefService]
    });
  });

  it('should be created', inject([WindowRefService], (service: WindowRefService) => {
    expect(service).toBeTruthy();
  }));
});


describe('DocumentRefService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocumentRefService]
    });
  });

  it('should be created', inject([DocumentRefService], (service: DocumentRefService) => {
    expect(service).toBeTruthy();
  }));
});
