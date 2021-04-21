import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Animal } from '../../../../common/tables/Animal';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {
  @ViewChild("newanimalnb") newanimalnb: ElementRef;
  @ViewChild("newClinique") newClinique: ElementRef;
  @ViewChild("newProprietaire") newProprietaire: ElementRef;
  @ViewChild("newNom") newNom: ElementRef;
  @ViewChild("newtypeanimal") newtypeanimal: ElementRef;
  @ViewChild("newtypeespece") newtypeespece: ElementRef;
  @ViewChild("newtaille") newtaille: ElementRef;
  @ViewChild("newpoids") newpoids: ElementRef;
  @ViewChild("newdescription") newdescription: ElementRef;
  @ViewChild("newdateinscription") newdateinscription: ElementRef;
  @ViewChild("newetatactuel") newetatactuel: ElementRef;


  // public noProprietaire: Proprietaire[] = [];
  // public noClient: Client[] =[];

  public animalTable : Animal[] = []; 
  public duplicateError: boolean = false;

  constructor(public communicationService : CommunicationService) { }

  ngOnInit() {
    this.getAnimal();
  }

  public getAnimal():void{
    this.communicationService.getAnimals().subscribe ((animals:Animal[])=>{
      this.animalTable = animals;
      console.log(this.animalTable);
    });
  }

  public insertAnimals(): void {

    const animal: any = {
      noanimal : this.newanimalnb.nativeElement.innerText as number,
      noclinique : this.newClinique.nativeElement.innerText as number,
      noproprietaire :this.newProprietaire.nativeElement.innerText as number,
      nom :this.newNom.nativeElement.innerText,
      typeanimal : this.newtypeanimal.nativeElement.innerText,
      espece : this.newtypeespece.nativeElement.innerText,
      taille :this.newtaille.nativeElement.innerText,
      poids :this.newpoids.nativeElement.innerText,
      description:this.newdescription.nativeElement.innerText ,
      dateinscription :this.newdateinscription.nativeElement.innerText,
      etatactuel :this.newetatactuel.nativeElement.innerText,
    };

    this.communicationService.insertAnimal(animal).subscribe((res: number) => {
      if (res > 0) {
        this.communicationService.filter("update");
        console.log('insertAnimal',res);
      }
      this.refresh();
      this.duplicateError = res === -1;
    });
  }

  private refresh() {
    this.getAnimal();
    this.newanimalnb.nativeElement.innerText = "";
    this.newClinique.nativeElement.innerText = "";
    this.newProprietaire.nativeElement.innerText = "";

    this.newNom.nativeElement.innerText = "";
    this.newtypeanimal.nativeElement.innerText = "";
    this.newtaille.nativeElement.innerText = "";

    this.newpoids.nativeElement.innerText = "";
    this.newdescription.nativeElement.innerText = "";
    this.newtypeespece.nativeElement.innerText = "";

    this.newdateinscription.nativeElement.innerText = "";
    this.newetatactuel.nativeElement.innerText = "";
  }


  public updateAnimal(i: number) {
    this.communicationService.updateAnimal(this.animalTable[i]).subscribe((res: any) => {
      this.refresh();
    });
  }
}
