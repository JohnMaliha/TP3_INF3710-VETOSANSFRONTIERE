import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";

import { Hotel } from "../../../common/tables/Hotel";
import { HotelPK } from "../../../common/tables/HotelPK";
import { Room } from "../../../common/tables/Room";
import { Guest } from "../../../common/tables/Guest";

import {Animal } from  "../../../common/tables/Animal";
import {Proprietaire} from "../../../common/tables/Proprietaire";
import {Clinique} from "../../../common/tables/Clinique";

import { DatabaseService } from "../services/database.service";
import Types from "../types";
import { Facture } from "../../../common/tables/Facture";


@injectable()
export class DatabaseController {
  public constructor(
    @inject(Types.DatabaseService) private databaseService: DatabaseService
  ) {}

  public get router(): Router {
    const router: Router = Router();

    // proprietaire
    router.get("/proprietaires",(req:Request, res:Response,_:NextFunction) => {
      this.databaseService
      .filterOwners()
      .then((result: pg.QueryResult) => {
        const proprietaire: Proprietaire[] = result.rows.map((proprio: Proprietaire) => ({
          noproprietaire :proprio.noproprietaire,
          noclinique :proprio.noclinique,
          nomproprietaire :proprio.nomproprietaire,
          adresseproprio :proprio.adresseproprio,
          notel :proprio.notel,
        }));
        res.json(proprietaire);
      })
      .catch((e: Error) => {
        console.error(e.stack);
      });
  });

     // clinique
     router.get("/cliniques",(req:Request, res:Response,_:NextFunction) => {
      this.databaseService
      .filterClinics()
      .then((result: pg.QueryResult) => {
        const cliniques: Clinique[] = result.rows.map((clinique: Clinique) => ({
          noclinique :clinique.noclinique,
          adresseclinique :clinique.adresseclinique,
          notel :clinique.notel,
          notelecopieur : clinique.notelecopieur,
          nomclinique :clinique.nomclinique,
        }));
        res.json(cliniques);
      })
      .catch((e: Error) => {
        console.error(e.stack);
      });
    });
    
    // animals
    router.get("/animals", (req: Request, res: Response, _: NextFunction) => {
      this.databaseService
        .filterAnimals()
        .then((result: pg.QueryResult) => {
          const animals: Animal[] = result.rows.map((animal: Animal) => ({
            noanimal : animal.noanimal,
            noclinique : animal.noclinique,
            noproprietaire : animal.noproprietaire,
            nom :animal.nom,
            typeanimal : animal.typeanimal,
            espece :animal.espece,
            taille :animal.taille,
            poids :animal.poids,
            description:animal.description ,
            dateinscription :animal.dateinscription,
            etatactuel :animal.etatactuel,
          }));
          res.json(animals);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    });

    router.post(
      "/animals/insert", async (req: Request, res: Response, _: NextFunction) => {
        console.log("victor",req);
        const animal: Animal = {
            noanimal : req.body.noanimal,
            noclinique : req.body.noclinique,
            noproprietaire : req.body.noproprietaire,
            nom :req.body.nom,
            typeanimal : req.body.typeanimal,
            espece :req.body.espece,
            taille :req.body.taille,
            poids :req.body.poids,
            description:req.body.description ,
            dateinscription :req.body.dateinscription,
            etatactuel :req.body.etatactuel,
        };

        await this.databaseService
          .createAnimal(animal)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    );

    router.put(
      "/animals/update",
      (req: Request, res: Response, _: NextFunction) => {
        const animal: Animal = {
            noanimal : req.body.noanimal ? req.body.noanimal : "",
            noclinique : req.body.noclinique ? req.body.noclinique: "",
            noproprietaire : req.body.noproprietaire ? req.body.noproprietaire: "",
            nom :req.body.nom ? req.body.nom: "",
            typeanimal : req.body.typeanimal ? req.body.typeanimal:  "",
            espece :req.body.espece ?  req.body.espece : "",
            taille :req.body.taille ? req.body.taille: "",
            poids :req.body.poids ? req.body.poids : "",
            description:req.body.description ? req.body.description: "" ,
            dateinscription :req.body.dateinscription ? req.body.dateinscription : "",
            etatactuel :req.body.etatactuel ? req.body.etatactuel : "",
        };

        this.databaseService
          .updateAnimal(animal)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );


    router.post(
      "/animals/delete/:noanimal",
      (req: Request, res: Response, _: NextFunction) => {
        const noanimaltodel: number = req.params.noanimal;
        this.databaseService
          .deleteAnimal(noanimaltodel)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );


    // facture 

  router.get("/factures", (req: Request, res: Response, _: NextFunction) => {
      this.databaseService
        .filterFacture()
        .then((result: pg.QueryResult) => {
          const factures: Facture[] = result.rows.map((facture: Facture) => ({
            noproprietaire : facture.noproprietaire,
            noanimal : facture.noanimal,
            noemploye : facture.noemploye,
            datefacture : facture.datefacture,
            listetraitement : facture.listetraitement,
            total : facture.total,
            modedepaiement :facture.modedepaiement,
            paiementeffectuer :facture.paiementeffectuer,
          }));
          res.json(factures);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    });

    router.post(
      "/factures/insert", async (req: Request, res: Response, _: NextFunction) => {
        const facture: Facture = {
          noproprietaire :req.body.noproprietaire,
          noanimal : req.body.noanimal,
          noemploye :req.body.noemploye,
          datefacture : req.body.datefacture,
          listetraitement : req.body.listetraitement,
          total :req.body.total,
          modedepaiement :req.body.modedepaiement,
          paiementeffectuer:req.body.paiementeffectuer,
        };

        await this.databaseService
          .createFacture(facture)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    );

    router.post(
      "/factures/delete/:noproprietaire + noanimal + noemploye",
      (req: Request, res: Response, _: NextFunction) => {
        const facturedelete: Facture = {
          noproprietaire:req.body.noproprietaire,noanimal:req.body.noanimal,
          noemploye:req.body.noemploye,
          datefacture : req.body.datefacture,
          listetraitement : req.body.listetraitement,
          total :req.body.total,
          modedepaiement :req.body.modedepaiement,
          paiementeffectuer:req.body.paiementeffectuer};
        this.databaseService
          .deleteFacture(facturedelete)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );

    // router.put(
    //   "/factures/update",
    //   (req: Request, res: Response, _: NextFunction) => {
    //     const animal: Animal = {
    //         noanimal : req.body.noanimal ? req.body.noanimal : "",
    //         noclinique : req.body.noclinique ? req.body.noclinique: "",
    //         noproprietaire : req.body.noproprietaire ? req.body.noproprietaire: "",
    //         nom :req.body.nom ? req.body.nom: "",
    //         typeanimal : req.body.typeanimal ? req.body.typeanimal:  "",
    //         espece :req.body.espece ?  req.body.espece : "",
    //         taille :req.body.taille ? req.body.taille: "",
    //         poids :req.body.poids ? req.body.poids : "",
    //         description:req.body.description ? req.body.description: "" ,
    //         dateinscription :req.body.dateinscription ? req.body.dateinscription : "",
    //         etatactuel :req.body.etatactuel ? req.body.etatactuel : "",
    //     };

    //     this.databaseService
    //       .updateAnimal(animal)
    //       .then((result: pg.QueryResult) => {
    //         res.json(result.rowCount);
    //       })
    //       .catch((e: Error) => {
    //         console.error(e.stack);
    //       });
    //   }
    // );




    // to delete
    router.get(
      "/hotels/hotelNb",
      (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
          .getHotelNamesByNos()
          .then((result: pg.QueryResult) => {
            const hotelsNbsNames = result.rows.map((hotel: HotelPK) => ({
              hotelnb: hotel.hotelnb,
              name: hotel.name,
            }));
            res.json(hotelsNbsNames);
          })

          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );


    router.post(
      "/hotels/insert",
      (req: Request, res: Response, _: NextFunction) => {
        const hotel: Hotel = {
          hotelnb: req.body.hotelnb,
          name: req.body.name,
          city: req.body.city,
        };

        this.databaseService
          .createHotel(hotel)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    );


    router.post(
      "/hotels/delete/:hotelNb",
      (req: Request, res: Response, _: NextFunction) => {
        const hotelNb: string = req.params.hotelNb;
        this.databaseService
          .deleteHotel(hotelNb)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );


    router.put(
      "/hotels/update",
      (req: Request, res: Response, _: NextFunction) => {
        const hotel: Hotel = {
          hotelnb: req.body.hotelnb,
          name: req.body.name ? req.body.name : "",
          city: req.body.city ? req.body.city : "",
        };

        this.databaseService
          .updateHotel(hotel)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );


    // ======= ROOMS ROUTES =======
    router.get("/rooms", (req: Request, res: Response, _: NextFunction) => {
      const hotelNb = req.query.hotelNb ? req.query.hotelNb : "";
      const roomNb = req.query.roomNb ? req.query.roomNb : "";
      const roomType = req.query.type ? req.query.type : "";
      const roomPrice = req.query.price ? parseFloat(req.query.price) : -1;

      this.databaseService
        .filterRooms(hotelNb, roomNb, roomType, roomPrice)
        .then((result: pg.QueryResult) => {
          const rooms: Room[] = result.rows.map((room: Room) => ({
            hotelnb: room.hotelnb,
            roomnb: room.roomnb,
            type: room.type,
            price: parseFloat(room.price.toString()),
          }));

          res.json(rooms);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    });


    router.post(
      "/rooms/insert",
      (req: Request, res: Response, _: NextFunction) => {
        const room: Room = {
          hotelnb: req.body.hotelnb,
          roomnb: req.body.roomnb,
          type: req.body.type,
          price: parseFloat(req.body.price),
        };

        this.databaseService
          .createRoom(room)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    );


    router.put(
      "/rooms/update",
      (req: Request, res: Response, _: NextFunction) => {
        const room: Room = {
          hotelnb: req.body.hotelnb,
          roomnb: req.body.roomnb,
          type: req.body.type,
          price: parseFloat(req.body.price),
        };

        this.databaseService
          .updateRoom(room)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    );


    router.post(
      "/rooms/delete/:hotelNb/:roomNb",
      (req: Request, res: Response, _: NextFunction) => {
        const hotelNb: string = req.params.hotelNb;
        const roomNb: string = req.params.roomNb;

        this.databaseService
          .deleteRoom(hotelNb, roomNb)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    );


    // ======= GUEST ROUTES =======
    router.post(
      "/guests/insert",
      (req: Request, res: Response, _: NextFunction) => {
        const guest: Guest = {
          guestnb: req.body.guestnb,
          nas: req.body.nas,
          name: req.body.name,
          gender: req.body.gender,
          city: req.body.city
        };

        this.databaseService
          .createGuest(guest)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    );


    router.get(
      "/guests/:hotelNb/:roomNb",
      (req: Request, res: Response, _: NextFunction) => {
        const hotelNb: string = req.params.hotelNb;
        const roomNb: string = req.params.roomNb;

        this.databaseService
        .getGuests(hotelNb, roomNb)
        .then((result: pg.QueryResult) => {
          const guests: Guest[] = result.rows.map((guest: any) => ({
            guestnb: guest.guestnb,
            nas: guest.nas,
            name: guest.name,
            gender: guest.gender,
            city: guest.city,
          }));
          res.json(guests);
        })
        .catch((e: Error) => {
          console.error(e.stack);
          res.json(-1);
        });
      }
    );


    // ======= GENERAL ROUTES =======
    router.get(
      "/tables/:tableName",
      (req: Request, res: Response, next: NextFunction) => {
        this.databaseService
          .getAllFromTable(req.params.tableName)
          .then((result: pg.QueryResult) => {
            res.json(result.rows);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );

    return router;
  }
}
