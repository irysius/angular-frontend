import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective {

  constructor(private host: ElementRef) {
  }

  @HostListener('click')
  onClick(): void {
    console.log('I am clicked');
    console.log(this.host.nativeElement.getBoundingClientRect());
  }
}
