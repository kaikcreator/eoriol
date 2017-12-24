import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeWhiteSectionComponent } from './home-white-section.component';

describe('HomeWhiteSectionComponent', () => {
  let component: HomeWhiteSectionComponent;
  let fixture: ComponentFixture<HomeWhiteSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeWhiteSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeWhiteSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
