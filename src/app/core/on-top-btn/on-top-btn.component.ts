import { Component} from '@angular/core';
import {ViewportScroller} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-on-top-btn',
  templateUrl: './on-top-btn.component.html',
  styleUrls: ['./on-top-btn.component.scss']
})
export class OnTopBtnComponent {

  constructor(
    private viewport: ViewportScroller,
    public router: Router
  ) {}

  onTop(): void {
    this.viewport.scrollToPosition([0, 0]);
  }
}
