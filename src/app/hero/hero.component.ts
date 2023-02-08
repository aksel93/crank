import { coerceStringArray } from '@angular/cdk/coercion';
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit } from '@angular/core';
import { single } from 'rxjs';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  rlink1 = 0;
  rlink2 = 0;
  rlink3 = 0;
  rlink4 = 0;
  crankangle = 0;
  Theta3 = 0;
  Gamma = 0;
  oTheta3 = 0;
  oTheta4 = 0;
  oGamma = 0;
  fTheta3 = 0;
  fTheta4 = 0;
  BD = 0;
  fGamma= 0;
  IL = false;
  offset= false;
  bar = false;
  rows = [{ca: 0, bd: 0, th: 0, th4: 0, gr:0}]

 @ViewChild('canvas', {static: true}) myCanvas!: ElementRef;
  draw(): void{
    const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    const context = canvas.getContext('2d');
  if(context){
    let a = 50+(this.rlink2*25)*Math.cos(this.crankangle*(Math.PI/180));
    let b = 125-(this.rlink2*25)*Math.sin(this.crankangle*(Math.PI/180));
    let c = a+(this.rlink3*25)*Math.cos(this.Theta3*(Math.PI/180));
    context.beginPath();
    context.strokeStyle='red';
    context.moveTo(50,125);
    context.lineTo(a, b);
    context.stroke();
    context.beginPath();
    context.strokeStyle="blue";
    context.moveTo(a,b);
    context.lineTo(c, 125);
    context.stroke();
  }
  }
  offdraw(): void{
    const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    const context = canvas.getContext('2d');
  if(context){
    let a = (this.rlink2*25)*Math.cos(this.crankangle*(Math.PI/180));
    let b = (this.rlink2*25)*Math.sin(this.crankangle*(Math.PI/180));
    let c = a+(this.rlink3*25)*Math.cos(this.oTheta3*(Math.PI/180));
    let e = 125+(this.rlink1*25)
    context.beginPath();
    context.strokeStyle='red';
    context.moveTo(50,125);
    context.lineTo(50+a, 125-b);
    context.stroke();
    context.beginPath();
    context.strokeStyle='blue';
    context.moveTo(50+a, 125-b)
    context.lineTo(50+c, e);
    context.stroke();
  }
  }
  fourdraw(): void{
    const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    const context = canvas.getContext('2d');
  if(context){
    let a = (this.rlink2*25)*Math.cos(this.crankangle*(Math.PI/180));
    let b = (this.rlink2*25)*Math.sin(this.crankangle*(Math.PI/180));
    let c = (this.rlink3*25)*Math.cos(this.fTheta3*(Math.PI/180));
    let d = (this.rlink3*25)*Math.sin(this.fTheta3*(Math.PI/180));
    let e = (this.rlink1*25);
    context.beginPath();
    context.strokeStyle='red';
    context.moveTo(50,125);
    context.lineTo(50+a, 125-b);
    context.stroke();
    context.beginPath();
    context.strokeStyle='blue';
    context.moveTo(50+a, 125-b);
    context.lineTo(50+a+c, 125-b-d);
    context.stroke();
    context.beginPath();
    context.strokeStyle='green';
    context.moveTo(50+a+c, 125-b-d)
    context.lineTo(50+e, 125);
    context.stroke();
  }
  }
  clear(): void{
    const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    const context = canvas.getContext('2d');
  if(context){
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
  this.rows = [];
}
onLink1(link1: HTMLInputElement){
  let rlink = link1.value;
  this.rlink1 = Number(rlink);
}
onLink2(link2: HTMLInputElement){
  let rlink = link2.value;
  this.rlink2 = Number(rlink);
}
onLink3(link3: HTMLInputElement){
  let rlink = link3.value;
  this.rlink3 = Number(rlink);
}
onLink4(link4: HTMLInputElement){
  let rlink = link4.value;
  this.rlink4 = Number(rlink);
}
onCrank(crank: HTMLInputElement){
  let rcrank = crank.value;
  this.crankangle = Number(rcrank);
}
calcIn() {
this.Theta3 = Math.round((Math.asin(((this.rlink2*Math.sin(this.crankangle*(Math.PI/180)))/this.rlink3)))*(180/Math.PI)*100)/100;
this.Gamma = Math.round((180-(this.Theta3+this.crankangle))*100)/100;
this.rows.push({ca: this.crankangle, bd: 0, th: this.Theta3, th4:0, gr: this.Gamma})
}
calcOff() {
  this.oTheta3 = Math.round(((Math.asin(((this.rlink1+(this.rlink2*Math.sin(this.crankangle)*(Math.PI/180)))/this.rlink3)))*(180/Math.PI))*100)/100;
  this.oGamma = Math.round((180-(this.oTheta3+this.crankangle))*100)/100;
  this.oTheta4 = Math.round((this.rlink2*Math.cos(this.crankangle*(Math.PI/180))+(this.rlink3*Math.cos(this.oTheta3*(Math.PI/180))))*100)/100;
  this.rows.push({ca: this.crankangle, bd: 0, th: this.oTheta3, th4: this.oTheta4, gr: this.oGamma})
  }

calcfour(){
  this.BD = Math.round(Math.sqrt((Math.pow(this.rlink1,2)+Math.pow(this.rlink2,2)-2*this.rlink1*this.rlink2*Math.cos(this.crankangle*(Math.PI/180))))*100)/100;
  this.fGamma = Math.round(Math.acos((Math.pow(this.rlink3,2)+Math.pow(this.rlink4,2)-Math.pow(this.BD,2))/(2*this.rlink3*this.rlink4))*(180/Math.PI)*100)/100;
  this.fTheta3 = Math.round(2*Math.atan(((-this.rlink2*Math.sin(this.crankangle*(Math.PI/180))+this.rlink4*Math.sin(this.fGamma*(Math.PI/180)))/(this.rlink1+this.rlink3-this.rlink2*Math.cos(this.crankangle*(Math.PI/180))-this.rlink4*Math.cos(this.fGamma*(Math.PI/180)))))*(180/Math.PI)*100)/100;
  this.fTheta4 = Math.round(2*(Math.atan((this.rlink2*Math.sin(this.crankangle*(Math.PI/180))-this.rlink3*Math.sin(this.fGamma*(Math.PI/180)))/(this.rlink2*Math.cos(this.crankangle*(Math.PI/180))+this.rlink4-this.rlink1-this.rlink3*Math.cos(this.fGamma*(Math.PI/180)))))*(180/Math.PI)*100)/100;
  this.rows.push({ca: this.crankangle, bd: this.BD, th: this.fTheta3, th4: this.fTheta4, gr: this.fGamma})
}

tab = 0;

openTab(tabnumber: number){
  this.rows=[];
if(tabnumber== 0){
this.tab = 1;
this.IL = true;
this.offset =false;
this.bar =false;
}else if(tabnumber ==1){
this.tab = 2;
this.IL = false;
this.offset =true;
this.bar =false;
}else{
this.tab = 3;
this.IL = false;
this.offset =false;
this.bar =true;
}
const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
const context = canvas.getContext('2d');
if(context){
  context.clearRect(0, 0, canvas.width, canvas.height);
}
}
}


