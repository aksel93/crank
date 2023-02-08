import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  rlink1 = 0;
  rlink2 = 0;
  rlink3 = 0;
  rlink4 = 0;
  crankangle = [0];
  increment = 0;
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
  calcAngle = 0;

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
  this.increment = Number(rcrank);
  for(let i = 0; i<=360/this.increment; i++){
  this.calcAngle = this.increment+this.crankangle[i];
  this.crankangle.push(this.calcAngle)}
}
calcIn() {
for(let i =0; i<=360/this.increment; i++){
this.Theta3 = Math.round((Math.asin(((this.rlink2*Math.sin(this.crankangle[i]*(Math.PI/180)))/this.rlink3)))*(180/Math.PI)*100)/100;
this.Gamma = Math.round((180-(this.Theta3+this.crankangle[i]))*100)/100;
this.rows.push({ca: this.crankangle[i], bd: 0, th: this.Theta3, th4:0, gr: this.Gamma})}
this.crankangle.splice(1,30);
}
calcOff() {
  for(let i =0; i<=360/this.increment; i++){
  this.oTheta3 = Math.round(((Math.asin(((this.rlink1+(this.rlink2*Math.sin(this.crankangle[i])*(Math.PI/180)))/this.rlink3)))*(180/Math.PI))*100)/100;
  this.oGamma = Math.round((180-(this.oTheta3+this.crankangle[i]))*100)/100;
  this.oTheta4 = Math.round((this.rlink2*Math.cos(this.crankangle[i]*(Math.PI/180))+(this.rlink3*Math.cos(this.oTheta3*(Math.PI/180))))*100)/100;
  this.rows.push({ca: this.crankangle[i], bd: 0, th: this.oTheta3, th4: this.oTheta4, gr: this.oGamma})}
  this.crankangle.splice(1,30);
  }

calcfour(){
  for(let i =0; i<=360/this.increment; i++){
  this.BD = Math.round(Math.sqrt((Math.pow(this.rlink1,2)+Math.pow(this.rlink2,2)-2*this.rlink1*this.rlink2*Math.cos(this.crankangle[i]*(Math.PI/180))))*100)/100;
  this.fGamma = Math.round(Math.acos((Math.pow(this.rlink3,2)+Math.pow(this.rlink4,2)-Math.pow(this.BD,2))/(2*this.rlink3*this.rlink4))*(180/Math.PI)*100)/100;
  this.fTheta3 = Math.round(2*Math.atan(((-this.rlink2*Math.sin(this.crankangle[i]*(Math.PI/180))+this.rlink4*Math.sin(this.fGamma*(Math.PI/180)))/(this.rlink1+this.rlink3-this.rlink2*Math.cos(this.crankangle[i]*(Math.PI/180))-this.rlink4*Math.cos(this.fGamma*(Math.PI/180)))))*(180/Math.PI)*100)/100;
  this.fTheta4 = Math.round(2*(Math.atan((this.rlink2*Math.sin(this.crankangle[i]*(Math.PI/180))-this.rlink3*Math.sin(this.fGamma*(Math.PI/180)))/(this.rlink2*Math.cos(this.crankangle[i]*(Math.PI/180))+this.rlink4-this.rlink1-this.rlink3*Math.cos(this.fGamma*(Math.PI/180)))))*(180/Math.PI)*100)/100;
  this.rows.push({ca: this.crankangle[i], bd: this.BD, th: this.fTheta3, th4: this.fTheta4, gr: this.fGamma})}
  this.crankangle.splice(1,30);
}
clear(){
  this.rows.splice(0,31);
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
}
}
