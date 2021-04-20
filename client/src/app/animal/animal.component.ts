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
  @ViewChild("newHotelNb") newHotelNb: ElementRef;
  @ViewChild("newHotelName") newHotelName: ElementRef;
  @ViewChild("newHotelCity") newHotelCity: ElementRef;
  
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


  private refresh() {
    this.getAnimal();
    this.newHotelNb.nativeElement.innerText = "";
    this.newHotelName.nativeElement.innerText = "";
    this.newHotelCity.nativeElement.innerText = "";
  }


  public updateAnimal(i: number) {
    this.communicationService.updateAnimal(this.animalTable[i]).subscribe((res: any) => {
      this.refresh();
    });
  }
}
