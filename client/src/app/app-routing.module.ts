import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { AnimalComponent } from "./animal/animal.component";
import { FactureComponent } from "./facture/facture.component";
import { TraitementComponent } from "./traitement/traitement.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "animals", component: AnimalComponent },
  { path: "factures", component: FactureComponent },
  { path: "traitements", component: TraitementComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }