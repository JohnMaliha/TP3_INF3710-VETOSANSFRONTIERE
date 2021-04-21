import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';
import { Traitement } from '../../../../common/tables/Traitement';
// import { MultipleTraitement } from '../../../../common/tables/MultipleTraitement';
// import { Examen } from '../../../../common/tables/Examen';
import { Animal } from '../../../../common/tables/Animal';




@Component({
  selector: 'app-traitement',
  templateUrl: './traitement.component.html',
  styleUrls: ['./traitement.component.css']
})
export class TraitementComponent implements OnInit {

  constructor(public communicationService:CommunicationService) { }
  public factureTable : Traitement[] = []; 
  public animalTable : Animal[] = []; 


  ngOnInit() {
    this.getAnimal();
  }

  public getAnimal():void{
    this.communicationService.getAnimals().subscribe ((animales:Animal[])=>{
      this.animalTable = animales;
    });
  }
  

}
