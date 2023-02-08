import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroComponent } from './hero/hero.component';
import { AppComponent } from './app.component';
import { EquationsComponent } from './equations/equations.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  { path: "calc", component: HeroComponent },
  { path: "equations", component: EquationsComponent },
  { path: "table", component: TableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HeroComponent, AppComponent]