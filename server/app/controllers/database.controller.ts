import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";

import {Animal } from  "../../../common/tables/Animal";
import {Proprietaire} from "../../../common/tables/Proprietaire";
import {Clinique} from "../../../common/tables/Clinique";

import { DatabaseService } from "../services/database.service";
import Types from "../types";
import { Facture } from "../../../common/tables/Facture";
import {ListeTraitementAnimal} from '../../../common/tables/ListeTraitementAnimal'
import { Traitement } from "../../../common/tables/Traitement";
import { MultipleTraitement } from "../../../common/tables/MultipleTraitement";
import { Examen } from "../../../common/tables/Examen";





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

     // animals by name
     router.get("/animalsname/:nom", (req: Request, res: Response, _: NextFunction) => {
      this.databaseService
        .filterAnimalsbyName(req.params.nom)
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
      "/factures/delete/: facturedelete",
      (req: Request, res: Response, _: NextFunction) => {
        const facturedelete: Facture = {
          noproprietaire:req.body.noproprietaire,
          noanimal:req.body.noanimal,
          noemploye:req.body.noemploye,
          datefacture : req.body.datefacture,
          listetraitement : req.body.listetraitement,
          total :req.body.total,
          modedepaiement :req.body.modedepaiement,
          paiementeffectuer:req.body.paiementeffectuer};
          console.log(facturedelete);
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

    // traitement

    router.get("/examen,traitement,traitementmultiple/:noanimal", (req: Request, res: Response, _: NextFunction) => {
      const noanimal = req.body.noanimal;
      this.databaseService
        .findTraitementAnimal(noanimal)
        .then((result: pg.QueryResult) => {
          const traitementanimal: ListeTraitementAnimal[] = result.rows.map((traitementrecu: ListeTraitementAnimal) => ({
            notraitement : traitementrecu.notraitement,
            noexamen : traitementrecu.noexamen,
            nomveterinaire: traitementrecu.nomveterinaire,
            descriptiontraitement:traitementrecu.descriptiontraitement,
          }));
          res.json(traitementanimal);
          console.log(traitementanimal);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    });

    router.get("/traitements", (req: Request, res: Response, _: NextFunction) => {
      this.databaseService
        .filterTraitements()
        .then((result: pg.QueryResult) => {
          const traitements: Traitement[] = result.rows.map((traitement: Traitement) => ({
            notraitement :traitement.notraitement,
            descriptionTraitement:traitement.descriptionTraitement,
            couttraitement :traitement.couttraitement,
          }));
          res.json(traitements);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    });

    // examens
    router.get("/examens", (req: Request, res: Response, _: NextFunction) => {
      this.databaseService
        .filterExamens()
        .then((result: pg.QueryResult) => {
          const examens: Examen[] = result.rows.map((examen: Examen) => ({
            noexamen: examen.noexamen,
            noanimal: examen.noanimal,
            date : examen.date,
            heure :examen.heure,
            nomveterinaire :examen.nomveterinaire,
            description:examen.description,
          }));
          res.json(examens);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    });

    // multiple traitement
    router.get("/multipletraitements", (req: Request, res: Response, _: NextFunction) => {
      this.databaseService
        .filterMultiTraitements()
        .then((result: pg.QueryResult) => {
          const multiTraitement: MultipleTraitement[] = result.rows.map((multi: MultipleTraitement) => ({
            noexamen : multi.noexamen,
            notraitement :multi.notraitement,
          }));
          res.json(multiTraitement);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    });
    
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
