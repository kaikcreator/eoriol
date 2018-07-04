import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharePostBarComponent } from './share-post-bar.component';

describe('SharePostBarComponent', () => {
  let component: SharePostBarComponent;
  let fixture: ComponentFixture<SharePostBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharePostBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharePostBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
