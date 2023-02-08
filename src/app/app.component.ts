import { INPUT_MODALITY_DETECTOR_OPTIONS } from '@angular/cdk/a11y';
import { IfStmt } from '@angular/compiler';
import { Component, ViewChild, ElementRef, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { rippleMouseHandler } from '@syncfusion/ej2-angular-buttons';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
openNav(){
  let open = (document.getElementById('buttons') as HTMLElement);
  let main = (document.getElementById('main') as HTMLElement);
  open.style.width = "200px";
  main.style.marginLeft = "200px";
}
closeNav(){
  let close = (document.getElementById('buttons') as HTMLElement);
  let main = (document.getElementById('main') as HTMLElement);
  close.style.width = "0px";
  main.style.marginLeft = "0px";
}
}
