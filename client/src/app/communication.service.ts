import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
// tslint:disable-next-line:ordered-imports
import { of, Observable, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { Animal } from "../../../common/tables/Animal";
import {Facture} from "../../../common/tables/Facture"
import {Proprietaire} from "../../../common/tables/Proprietaire"

import { Clinique } from "../../../common/tables/Clinique";
import { ListeTraitementAnimal } from "../../../common/tables/ListeTraitementAnimal";
import { Examen } from "../../../common/tables/Examen";
import { Traitement } from "../../../common/tables/Traitement";
import { MultipleTraitement } from "../../../common/tables/MultipleTraitement";

@Injectable()
export class CommunicationService {
  private readonly BASE_URL: string = "http://localhost:3000/database";
  public constructor(private http: HttpClient) {}

  private _listners: any = new Subject<any>();

  public listen(): Observable<any> {
    return this._listners.asObservable();
  }

  public filter(filterBy: string): void {
    this._listners.next(filterBy);
  }

  // Proprietaire, for drop down list in animals.
  public getProprietaires(): Observable<Proprietaire[]>{
    return this.http
      .get<Proprietaire[]>(this.BASE_URL + "/proprietaires")
      .pipe(catchError(this.handleError<Proprietaire[]>("getProprietaire")));
  }
  
   // Proprietaire, for drop down list in animals.
   public getCliniques(): Observable<Clinique[]>{
    return this.http
      .get<Clinique[]>(this.BASE_URL + "/cliniques")
      .pipe(catchError(this.handleError<Clinique[]>("getClinique")));
  }

  // Animals 
    // return all animals from the db
  public getAnimals(): Observable<Animal[]> {
    return this.http
      .get<Animal[]>(this.BASE_URL + "/animals")
      .pipe(catchError(this.handleError<Animal[]>("getAnimal")));
  }

  public updateAnimal(animal: Animal): Observable<number> {
    return this.http
      .put<number>(this.BASE_URL + "/animals/update", animal)
      .pipe(catchError(this.handleError<number>("updateAnimal")));
  }

  // inserts animals from client into db
  public insertAnimal(animal: Animal): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/animals/insert", animal)
      .pipe(catchError(this.handleError<number>("insertAnimal")));
  }

  public deleteAnimal(animaltodelete: number): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/animals/delete/" + animaltodelete, {})
      .pipe(catchError(this.handleError<number>("deleteAnimal")));
  }

  public getAnimalsByName(nom:string): Observable<Animal[]> {
    return this.http
      .get<Animal[]>(this.BASE_URL + "/animalsname/" + nom, {})
      .pipe(catchError(this.handleError<Animal[]>("getAnimalByNom")));
  } 

  // Facture
  public getFacture(): Observable<Facture[]> {
    return this.http
      .get<Facture[]>(this.BASE_URL + "/factures")
      .pipe(catchError(this.handleError<Facture[]>("getFacture")));
  }

   // inserts animals from client into db
   public insertFacture(facture: Facture): Observable<number> {
    console.log('communication',facture);
    return this.http
      .post<number>(this.BASE_URL + "/factures/insert", facture)
      .pipe(catchError(this.handleError<number>("insertFacture")));
  }

  public deleteFacture(noproprietaire:number,noanimal:number,noemploye:number): Observable<number> {
    console.log('hellp');
    console.log(this.BASE_URL + "/factures/delete/" , {noproprietaire,noanimal,noemploye});
    return this.http
    .post<number>(this.BASE_URL + "/factures/delete/" , {noproprietaire,noanimal,noemploye})
    .pipe(catchError(this.handleError<number>("deleteFacture")));
  }

  // traitement

  public getTraitementAnimal(noanimal:number): Observable<ListeTraitementAnimal[]> {
    console.log(noanimal);
    return this.http
      .get<ListeTraitementAnimal[]>(this.BASE_URL + "/ListeTraitementAnimal" + noanimal)
      .pipe(catchError(this.handleError<ListeTraitementAnimal[]>("getTraitementAnimal")));
  }

  //  examens 
  public getExamens(): Observable<Examen[]> {
    return this.http
      .get<Examen[]>(this.BASE_URL + "/examens")
      .pipe(catchError(this.handleError<Examen[]>("getExamen")));
  }

  // traitement
  public getTraitements(): Observable<Traitement[]> {
    return this.http
      .get<Traitement[]>(this.BASE_URL + "/traitements")
      .pipe(catchError(this.handleError<Traitement[]>("getTraitement")));
  }

  // traitementmultiple
  public getMultipleTraitements(): Observable<MultipleTraitement[]> {
    return this.http
      .get<MultipleTraitement[]>(this.BASE_URL + "/multipletraitements")
      .pipe(catchError(this.handleError<MultipleTraitement[]>("getMultipleTraitement")));
  }

  private handleError<T>(
    request: string,
    result?: T
  ): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }

}
