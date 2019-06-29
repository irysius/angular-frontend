import { Component, OnInit, HostListener, Input, ElementRef, ViewChild } from '@angular/core';
import { ISize, IPosition, ITooltipPositions, TooltipPlacement } from '../helpers/TooltipHelper';
import { TooltipService } from '../tooltip.service';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.sass']
})
export class TooltipComponent implements OnInit {

  constructor(private tooltipService: TooltipService) {

  }

  @Input() tooltipText: string = 'This is a tooltip';
  @ViewChild('container', { read: ElementRef, static: true }) container;

  ngOnInit() {
    this.tooltipService.registerTooltip(this);
  }

  tooltipClassList: string[] = ['app-tooltip'];

  bodyPosition: Record<string, any> = {};
  arrowPosition: Record<string, any> = {};

  @HostListener('window:resize')
  onWindowResize(): void {
    this.tooltipService.update();
  }
  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.tooltipService.update();
  }
  @HostListener('window:click') 
  onWindowClick(): void {
    this.tooltipService.dismiss();
  }

  update(tooltipPositions: ITooltipPositions) {
    if (tooltipPositions == null) {
      console.log('need to hide tooltip');
    } else {
      const { body, arrow, placement } = tooltipPositions;
      this.bodyPosition = {
        top: `${body.top}px`,
        left: `${body.left}px`
      };
      this.arrowPosition = {
        top: `${arrow.top}px`,
        left: `${arrow.left}px`
      };
      this.tooltipClassList = [
        'app-tooltip', 
        placement === TooltipPlacement.Above ? 'above' : 'below'
      ];
    }
  }

  windowSize(): ISize {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  windowScroll(): IPosition {
    return {
      top: window.scrollY,
      left: window.scrollX
    };
  }

  getBoundingClientRect(): ClientRect {
    return this.container.nativeElement.getBoundingClientRect();
  }
}