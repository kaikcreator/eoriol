import { LQImgPlaceholderDirective } from './lqimg-placeholder.directive';
import { ElementRef } from '@angular/core';

describe('LqimgPlaceholderDirective', () => {
  it('should create an instance', () => {
    let element = new ElementRef('div');
    const directive = new LQImgPlaceholderDirective(element);
    expect(directive).toBeTruthy();
  });
});
