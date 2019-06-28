import { Component, OnInit, HostListener, Input } from '@angular/core';
import { ISize, IPosition } from '../helpers/TooltipHelper';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.sass']
})
export class TooltipComponent implements OnInit {

  constructor() { }

  @Input() tooltipText: string = 'This is a tooltip';

  ngOnInit() {
  }

  windowSize(): ISize {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  tooltipClassList() {
    return ['app-tooltip', 'below'];
  }
  bodyPosition() {
    return {
      top: '50px', left: '50px'
    };
  }
  arrowPosition() {
    return {
      top: '0px', left: '0px'
    };
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    console.log('window resize');
    console.log(this.windowSize());
  }
  @HostListener('window:scroll')
  onWindowScroll(): void {
    console.log('window scroll');
  }
}