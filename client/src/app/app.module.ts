import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./communication.service";
import { AnimalComponent } from './animal/animal.component';
import { FactureComponent } from './facture/facture.component';
import { TraitementComponent } from './traitement/traitement.component';

@NgModule({
  declarations: [			
    AppComponent,
    AnimalComponent,
    FactureComponent,
    TraitementComponent
   ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [CommunicationService],
  bootstrap: [AppComponent],
})
export class AppModule { }
