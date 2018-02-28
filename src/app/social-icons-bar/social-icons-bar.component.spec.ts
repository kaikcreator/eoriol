import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialIconsBarComponent } from './social-icons-bar.component';

describe('SocialIconsBarComponent', () => {
  let component: SocialIconsBarComponent;
  let fixture: ComponentFixture<SocialIconsBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialIconsBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialIconsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
