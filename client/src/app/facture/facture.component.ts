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


  public insertFactures(): void {
    const facture: any = {
      noproprietaire :this.noproprietaire.nativeElement.innerText as number,
      noanimal : this.noanimal.nativeElement.innerText as number,
      noemploye :this.noemploye.nativeElement.innerText as number,
      datefacture : this.datefacture.nativeElement.innerText,
      listetraitement : this.listetraitement.nativeElement.innerText,
      total :this.total.nativeElement.innerText,
      modedepaiement :this.modedepaiement.nativeElement.innerText,
      paiementeffectuer:this.paiementeffectuer.nativeElement.innerText ,
    };
    console.log(facture);
    this.communicationService.insertFacture(facture).subscribe((res: number) => {
      if (res > 0) {
        this.communicationService.filter("update");
      }
      this.refresh();
      this.duplicateError = res === -1;
    });
  }

  public deleteFacture(noproprietaire:number,noanimal:number,noemploye:number) {
    this.communicationService.deleteFacture(noproprietaire,noanimal,noemploye).subscribe((res: any) => {
      this.refresh();
    });
  }


  private refresh() {
    this.getFacture();
    this.noproprietaire.nativeElement.innerText = "";
    this.noanimal.nativeElement.innerText = "";
    this.noemploye.nativeElement.innerText = "";
    this.datefacture.nativeElement.innerText= "";
    this.listetraitement.nativeElement.innerText= "";
    this.total.nativeElement.innerText= "";
    this.modedepaiement.nativeElement.innerText= "";
    this.paiementeffectuer.nativeElement.innerText = "";
  }

}
