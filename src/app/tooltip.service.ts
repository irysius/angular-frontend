import { Injectable, ElementRef, HostListener, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core';
import { calculateTooltipPositions, ISize } from './helpers/TooltipHelper';
import { TooltipComponent } from './tooltip/tooltip.component';

@Injectable({
  providedIn: 'root'
})
export class TooltipService {

  constructor() { }

  activeHost: ElementRef;
  tooltipComponent: TooltipComponent;

  registerTooltip(cmp: TooltipComponent) {
    this.tooltipComponent = cmp;
  }

  toggle(host: ElementRef, text: string) {
    if (this.activeHost === host) {
      // Hide tooltip
      this.activeHost = null;
    } else {
      this.activeHost = host;
      this.tooltipComponent.tooltipText = text;
    }
    setTimeout(() => {
      this.update();
    });
  }

  update() {
    const hostBounds = this.activeHost != null
      ? this.activeHost.nativeElement.getBoundingClientRect()
      : null;
    const windowSize = this.tooltipComponent.windowSize();
    const windowScroll = this.tooltipComponent.windowScroll();
    const tooltipBounds = this.tooltipComponent.getBoundingClientRect();

    const tooltipPositions = calculateTooltipPositions({
      windowSize, windowScroll, hostBounds, tooltipBounds
    });
    
    this.tooltipComponent.update(tooltipPositions);
  }

  dismiss() {
    this.activeHost = null;
    this.update();
  }
}
