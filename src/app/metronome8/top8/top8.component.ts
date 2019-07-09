import {Component, ElementRef, OnInit} from '@angular/core';

declare var PIXI: any;

@Component({
  selector: 'app-top8',
  templateUrl: './top8.component.html',
  styleUrls: ['./top8.component.scss']
})
export class Top8Component implements OnInit {
  private dom: HTMLElement;
  private displayHeight: number;
  private displayWidth: number;
  private displayColor: string;

  constructor(el: ElementRef) {
    this.dom = el.nativeElement;

    this.displayHeight = window.innerHeight - 67;
    this.displayWidth  = window.innerWidth;
    this.displayColor = '0xf2f2f2';
  }

  ngOnInit() {
    const app = new PIXI.Application({
      width: this.displayWidth,
      height: this.displayHeight,
      backgroundColor: this.displayColor
    });

    this.dom.querySelector('#display').appendChild(app.view);

    app.loader.add('logo', '/assets/images/angular8/logo.png').load(
        (loader, resorces) => {
          const logo = new PIXI.Sprite(resorces.logo.texture);

          logo.x = app.renderer.width / 2;
          logo.y = app.renderer.height / 2;

          // Rotate around the center
          logo.anchor.x = 0.5;
          logo.anchor.y = 0.5;

          // Add the bunny to the scene we are building
          app.stage.addChild(logo);
        }
    );
  }
}
