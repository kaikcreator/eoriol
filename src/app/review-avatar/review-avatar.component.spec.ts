import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewAvatarComponent } from './review-avatar.component';

describe('ReviewAvatarComponent', () => {
  let component: ReviewAvatarComponent;
  let fixture: ComponentFixture<ReviewAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
