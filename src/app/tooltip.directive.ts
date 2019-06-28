import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective {

  constructor() { }

  @HostListener('click')
  onClick(): void {

  }
}
