import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeMobileComponent } from './subscribe-mobile.component';

describe('SubscribeMobileComponent', () => {
  let component: SubscribeMobileComponent;
  let fixture: ComponentFixture<SubscribeMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribeMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
