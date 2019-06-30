import { Directive, HostListener, ElementRef, Input } from '@angular/core';
import { TooltipService } from './tooltip.service';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective {

  @Input() tooltipText: string = '';

  constructor(private host: ElementRef, private tooltipService: TooltipService) {
  }

  @HostListener('click')
  onClick(): void {
    this.tooltipService.toggle(this.host, this.tooltipText);
    event.stopPropagation();
  }
}
