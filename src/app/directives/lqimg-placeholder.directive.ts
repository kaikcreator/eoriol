import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { WindowRefService } from '../services/globals.service';

@Directive({
  selector: '[appLQImgPlaceholder]'
})
export class LQImgPlaceholderDirective {

  hiQualityImgSrc = "";

  constructor(
    private element: ElementRef, 
    private winRef:WindowRefService,
    private renderer:Renderer2) { 
      this.hiQualityImgSrc = this.element.nativeElement.style.backgroundImage;
      this.element.nativeElement.style.backgroundImage = this.getLowQualityImgSrc();
      this.renderer.setStyle(this.element.nativeElement, 'filter',"blur(10px)");
      this.renderer.setStyle(this.element.nativeElement, 'clipPath', "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)");       
      this.onHiQualityImgLoad(()=>{
        this.renderer.setStyle(this.element.nativeElement, 'backgroundImage', this.hiQualityImgSrc);
        this.renderer.setStyle(this.element.nativeElement, 'filter',"");
        this.renderer.setStyle(this.element.nativeElement, 'clipPath', ""); 
      });      
  }


  getLowQualityImgSrc(){
    let lqImgSrc = this.hiQualityImgSrc;
    lqImgSrc = lqImgSrc.slice(0,lqImgSrc.lastIndexOf('.')) + '.lq' + lqImgSrc.slice(lqImgSrc.lastIndexOf('.'));
    return lqImgSrc;
  }

  onHiQualityImgLoad(callback){
    try{
      let img = new Image();
      img.src = this.extractUrl();
      img.onload = callback;
    }
    catch(e){
      console.log("Node does not have access to Image object");
    }
  }

  extractUrl(){
    let url = this.hiQualityImgSrc.replace(/^url\(("|')?/,'');
    url = url.replace(/("|')?\)$/,'');
    return url;
  }

}
