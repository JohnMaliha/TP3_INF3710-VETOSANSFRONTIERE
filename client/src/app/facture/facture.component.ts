import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Facture } from '../../../../common/tables/Facture';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {
  @ViewChild("noproprietaire") noproprietaire: ElementRef;
  @ViewChild("noanimal") noanimal: ElementRef;
  @ViewChild("noemploye") noemploye: ElementRef;
  @ViewChild("datefacture") datefacture: ElementRef;
  @ViewChild("listetraitement") listetraitement: ElementRef;
  @ViewChild("total") total: ElementRef;
  @ViewChild("modedepaiement") modedepaiement: ElementRef;
  @ViewChild("paiementeffectuer") paiementeffectuer: ElementRef;
  
  public factureTable : Facture[] = []; 
  public duplicateError: boolean = false;

  constructor(public communicationService : CommunicationService) { }

  ngOnInit() {
    this.getFacture();
  }

  public getFacture():void{
    this.communicationService.getFacture().subscribe ((factures:Facture[])=>{
      this.factureTable = factures;
      console.log(this.factureTable);
    });
  }

}
