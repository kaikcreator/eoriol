import { TestBed, inject } from '@angular/core/testing';

import { LQImgPlaceholderDirective } from './lqimg-placeholder.directive';
import { ElementRef, Renderer2 } from '@angular/core';
import { WindowRefService } from '../services/globals.service';

describe('LqimgPlaceholderDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WindowRefService, Renderer2]
    });
  });

  it('should create an instance', inject([WindowRefService, Renderer2], (windowRef: WindowRefService, renderer: Renderer2) => {
    let element = new ElementRef('div');
    const directive = new LQImgPlaceholderDirective(element, windowRef, renderer);
    expect(directive).toBeTruthy();    
  }));  

});
