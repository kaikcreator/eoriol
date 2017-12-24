import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBlackSectionComponent } from './home-black-section.component';

describe('HomeBlackSectionComponent', () => {
  let component: HomeBlackSectionComponent;
  let fixture: ComponentFixture<HomeBlackSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeBlackSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBlackSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
