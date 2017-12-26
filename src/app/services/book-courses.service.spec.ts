import { TestBed, inject } from '@angular/core/testing';

import { BookCoursesService } from './book-courses.service';

describe('BookCoursesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookCoursesService]
    });
  });

  it('should be created', inject([BookCoursesService], (service: BookCoursesService) => {
    expect(service).toBeTruthy();
  }));
});
