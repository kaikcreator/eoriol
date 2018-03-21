import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { WindowRefService } from './services/window-ref.service';

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
      this.onHiQualityImgLoad(()=>{
        this.renderer.setStyle(this.element.nativeElement, 'backgroundImage', this.hiQualityImgSrc);
      });      
  }

  // ngOnInit(){
  //   let styles = this.winRef.nativeWindow.getComputedStyle(this.element.nativeElement, null);
  //   console.log("styles detected: ", styles);

  //   if(styles.backgroundImage){
  //     this.hiQualityImgSrc = styles.backgroundImage;
  //     this.renderer.setStyle(this.element.nativeElement, 'backgroundImage', this.getLowQualityImgSrc());
      
  //     this.onHiQualityImgLoad(()=>{
  //       this.renderer.setStyle(this.element.nativeElement, 'backgroundImage', this.hiQualityImgSrc);
  //       this.renderer.setStyle(this.element.nativeElement, 'clipPath', ""); 
  //       this.renderer.setStyle(this.element.nativeElement, 'filter',"");
  //     });
  //   }
  //   this.renderer.setStyle(this.element.nativeElement, 'filter',"blur(10px)");
  //   this.renderer.setStyle(this.element.nativeElement, 'clipPath', "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)"); 
    
  // }

  getLowQualityImgSrc(){
    let lqImgSrc = this.hiQualityImgSrc;
    lqImgSrc = lqImgSrc.slice(0,lqImgSrc.lastIndexOf('.')) + '.lq' + lqImgSrc.slice(lqImgSrc.lastIndexOf('.'));
    return lqImgSrc;
  }

  onHiQualityImgLoad(callback){
    let img = new Image();
    img.src = this.extractUrl();
    img.onload = callback;
  }

  extractUrl(){
    let url = this.hiQualityImgSrc.replace(/^url\("/,'');
    url = url.replace(/"\)$/,'');
    return url;
  }

}
