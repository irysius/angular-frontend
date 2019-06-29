import { Directive, HostListener, ElementRef } from '@angular/core';
import { TooltipService } from './tooltip.service';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective {

  constructor(private host: ElementRef, private tooltipService: TooltipService) {
  }

  @HostListener('click')
  onClick(): void {
    this.tooltipService.toggle(this.host);
    event.stopPropagation();
  }
}
