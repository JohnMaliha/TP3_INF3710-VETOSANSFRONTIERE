import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
// tslint:disable-next-line:ordered-imports
import { of, Observable, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { Animal } from "../../../common/tables/Animal";
import {Facture} from "../../../common/tables/Facture"
import {Proprietaire} from "../../../common/tables/Proprietaire"

import {Hotel} from "../../../common/tables/Hotel"
import { Room } from "../../../common/tables/Room";
import { HotelPK } from "../../../common/tables/HotelPK";
import { Guest } from "../../../common/tables/Guest";
import { Clinique } from "../../../common/tables/Clinique";

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
    console.log('communication',animal);
    return this.http
      .post<number>(this.BASE_URL + "/animals/insert", animal)
      .pipe(catchError(this.handleError<number>("insertAnimal")));
  }

  public deleteAnimal(animaltodelete: number): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/animals/delete/" + animaltodelete, {})
      .pipe(catchError(this.handleError<number>("deleteAnimal")));
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

  public deleteFacture(facturetodelete: Facture): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/factures/delete/" + facturetodelete.noproprietaire + "/"+ facturetodelete.noanimal + "/" + facturetodelete.noemploye, {})
      .pipe(catchError(this.handleError<number>("deleteFacture")));
  }


  private handleError<T>(
    request: string,
    result?: T
  ): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }




  /* to delete after */ 
  public getHotels(): Observable<Hotel[]> {
    return this.http
      .get<Hotel[]>(this.BASE_URL + "/hotels")
      .pipe(catchError(this.handleError<Hotel[]>("getHotels")));
  }
  public insertHotel(hotel: Hotel): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/hotels/insert", hotel)
      .pipe(catchError(this.handleError<number>("insertHotel")));
  }

  public updateHotel(hotel: Hotel): Observable<number> {
    return this.http
      .put<number>(this.BASE_URL + "/hotels/update", hotel)
      .pipe(catchError(this.handleError<number>("updateHotel")));
  }

  public deleteHotel(hotelNb: string): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/hotels/delete/" + hotelNb, {})
      .pipe(catchError(this.handleError<number>("deleteHotel")));
  }

  public getHotelPKs(): Observable<HotelPK[]> {
    return this.http
      .get<HotelPK[]>(this.BASE_URL + "/hotels/hotelNb")
      .pipe(catchError(this.handleError<HotelPK[]>("getHotelPKs")));
  }

  public getRooms(hotelNb: string): Observable<Room[]> {
    return this.http
      .get<Room[]>(this.BASE_URL + `/rooms?hotelNb=${hotelNb}`)
      .pipe(catchError(this.handleError<Room[]>("getRooms")));
  }

  public insertRoom(room: Room): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/rooms/insert", room)
      .pipe(catchError(this.handleError<number>("inserHotel")));
  }

  public updateRoom(room: Room): Observable<number> {
    return this.http
      .put<number>(this.BASE_URL + "/rooms/update", room)
      .pipe(catchError(this.handleError<number>("updateRoom")));
  }

  public deleteRoom(hotelNb: string, roomNb: string): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + `/rooms/delete/${hotelNb}/${roomNb}`, {})
      .pipe(catchError(this.handleError<number>("deleteRoom")));
  }

  public getGuests(hotelNb: string, roomNb: string): Observable<Guest[]> {
    return this.http
      .get<Guest[]>(this.BASE_URL + `/guests/${hotelNb}/${roomNb}`)
      .pipe(catchError(this.handleError<Guest[]>("getGuests")));
  }


}
