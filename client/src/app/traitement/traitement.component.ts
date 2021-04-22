import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';
import { Traitement } from '../../../../common/tables/Traitement';
import { MultipleTraitement } from '../../../../common/tables/MultipleTraitement';
import { Examen } from '../../../../common/tables/Examen';
import { ListeTraitementAnimal } from '../../../../common/tables/ListeTraitementAnimal';




@Component({
  selector: 'app-traitement',
  templateUrl: './traitement.component.html',
  styleUrls: ['./traitement.component.css']
})
export class TraitementComponent implements OnInit {

  constructor(public communicationService:CommunicationService) { }
  public traitementTable : Traitement[] = []; 
  public multipleTraitementTable : MultipleTraitement[] = []; 
  public examenTable :Examen[] = [];
  public listeTraitementSelectionner : ListeTraitementAnimal[]=[];
  public noanimalchoisi:number; 

  ngOnInit() {
    //this.getAnimal();
    this.getExamen();
    this.getMultipleTraitement();
    this.getTraitement();
  }

  public getExamen():void{
    this.communicationService.getExamens().subscribe ((examen:Examen[])=>{
      this.examenTable = examen;
    });
  }

  public getTraitement():void{
    this.communicationService.getTraitements().subscribe ((traitement:Traitement[])=>{
      this.traitementTable = traitement;
    });
  }

  public getMultipleTraitement():void{
    this.communicationService.getMultipleTraitements().subscribe ((multiTraitement:MultipleTraitement[])=>{
      this.multipleTraitementTable = multiTraitement;
    });
  }

  // returns the traitements for noanimal
  public getnoAnimalTraitement(noanimal: number) {
    this.communicationService.getTraitementAnimal(noanimal).subscribe((traitementrecu: ListeTraitementAnimal[]) => {
      this.listeTraitementSelectionner = traitementrecu;
    });
    console.log(this.listeTraitementSelectionner);
    this.refresh();

  }

  public getnoAnimal(event:any){
    const value = event.target.value;
    this.noanimalchoisi =value;
    this.getnoAnimalTraitement(this.noanimalchoisi);
  }

  private refresh() {
    this.getExamen();
  }

}
