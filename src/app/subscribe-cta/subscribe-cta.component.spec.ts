import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeCtaComponent } from './subscribe-cta.component';

describe('SubscribeCtaComponent', () => {
  let component: SubscribeCtaComponent;
  let fixture: ComponentFixture<SubscribeCtaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribeCtaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeCtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
