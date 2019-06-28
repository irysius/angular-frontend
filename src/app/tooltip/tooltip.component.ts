import { Component, OnInit, HostListener } from '@angular/core';
import { ISize } from '../helpers/TooltipHelper';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.sass']
})
export class TooltipComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  windowSize(): ISize {
    return {
      width: window.innerWidth,
      height: window.innerHeight
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