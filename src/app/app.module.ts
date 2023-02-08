import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTabsModule} from '@angular/material/tabs';
import {AppComponent} from './app.component'
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { EquationsComponent } from './equations/equations.component';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [
    routingComponents,
    EquationsComponent,
    TableComponent
  ],
  imports: [
    BrowserModule, MatTabsModule, AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
