import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { Animal } from "../../../common/tables/Animal";
import { Facture } from "../../../common/tables/Facture";

@injectable()
export class DatabaseService {

  // TODO: A MODIFIER POUR VOTRE BD
  public connectionConfig: pg.ConnectionConfig = {
    user: "postgres",
    database: "tp3_VetoSansFrontieres_db",
    password: "admin",
    port: 5432,
    host: "127.0.0.1",
    keepAlive: true
  };

  public pool: pg.Pool = new pg.Pool(this.connectionConfig);

  // ======= DEBUG =======
  public async getAllFromTable(tableName: string): Promise<pg.QueryResult> {
    
    const client = await this.pool.connect();
    const res = await client.query(`SELECT * FROM TP3VetoSansFrontieresDB.${tableName};`);
    client.release();
    return res;
  }

  // postgres sql query to return all elements from proprietaires
  public async filterOwners() : Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    let query = "SELECT * FROM TP3VetoSansFrontieresDB.Proprietaire;";
    const res = await client.query(query);
    client.release();
    console.log(res);
    return res;
  }

  // postgres sql query to return all elements from clinique
  public async filterClinics() : Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    let query = "SELECT * FROM TP3VetoSansFrontieresDB.Clinique;";
    const res = await client.query(query);
    client.release();
    return res;
  }

  // get animal
  public async filterAnimals(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    let queryText = "SELECT * FROM TP3VetoSansFrontieresDB.Animal;";
    const res = await client.query(queryText);
    client.release();
  //  console.log("animal",res);
    return res;
  }

  public async filterAnimalsbyName(nom:string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    let queryText = `SELECT * FROM TP3VetoSansFrontieresDB.Animal as animals WHERE animals.nom = '${nom}';`;
    console.log(queryText);
    const res = await client.query(queryText);
    client.release();
  //  console.log("animal",res);
    return res;
  }
  
  public async createAnimal(animal: Animal): Promise<pg.QueryResult> {
    const client = await this.pool.connect();

    const queryText: string = `INSERT INTO TP3VetoSansFrontieresDB.Animal VALUES('${animal.noanimal}',
    '${animal.noclinique}',
    '${animal.noproprietaire}',
    '${animal.nom}','${animal.typeanimal}','${animal.espece}',
    '${animal.taille}','${animal.poids}','${animal.description}',
    '${animal.dateinscription}','${animal.etatactuel}');`;

    const res = await client.query(queryText);
    client.release();
    return res;
  }

  public async updateAnimal(animal: Animal): Promise<pg.QueryResult> {
    const client = await this.pool.connect();

    const query = `UPDATE TP3VetoSansFrontieresDB.Animal SET 
    noclinique ='${animal.noclinique}',
    noproprietaire =${animal.noproprietaire},
    nom='${animal.nom}',typeanimal ='${animal.typeanimal}',espece ='${animal.espece}',
    taille = '${animal.taille}', poids = '${animal.poids}', description = '${animal.description}',
    dateinscription ='${animal.dateinscription}',etatactuel ='${animal.etatactuel}' WHERE noanimal = ${animal.noanimal};`;

    const res = await client.query(query);
    client.release();
    return res;
  }

  public async deleteAnimal(noAnimal: number): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const res = await client.query(`DELETE FROM TP3VetoSansFrontieresDB.Animal WHERE noanimal = ${noAnimal};`);
    client.release();
    return res;
  }


  // facture
    public async filterFacture(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    let queryText = "SELECT * FROM TP3VetoSansFrontieresDB.Facture;";
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  public async createFacture(facture: Facture): Promise<pg.QueryResult> {
    const client = await this.pool.connect();

    const queryText: string = `INSERT INTO TP3VetoSansFrontieresDB.Facture VALUES('${facture.noproprietaire}',
    '${facture.noanimal}',
    '${facture.noemploye}',
    '${facture.datefacture}','${facture.listetraitement}','${facture.total}',
    '${facture.modedepaiement}','${facture.paiementeffectuer}');`;

    const res = await client.query(queryText);
    client.release();
    console.log(res);
    return res;
  }

  public async deleteFacture(noproprio:number,animalno:number,employeno:number): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const res = await client.query(`DELETE FROM TP3VetoSansFrontieresDB.Facture WHERE noproprietaire = ${noproprio} AND noanimal = ${animalno} AND noemploye =${employeno} ;`);
    console.log(res); 
    client.release();
    return res;
  }


  // traitement : query qui retourne les traitements pr 1 animal particuler
  public async findTraitementAnimal(noanimal:number):Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const res = await client.query(`SELECT e.noanimal,e.noexamen,e.nomveterinaire,traitement.descriptiontraitement,mt.notraitement,traitement.couttraitement
    FROM TP3VetoSansFrontieresDB.Examen e,TP3VetoSansFrontieresDB.Traitement traitement,TP3VetoSansFrontieresDB.MultipleTraitement mt
    WHERE e.noanimal = ${noanimal} AND e.noexamen = mt.noexamen AND mt.notraitement = traitement.notraitement;`);
    client.release();
    return res;
  }

  // examen
  public async filterExamens(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    let queryText = "SELECT * FROM TP3VetoSansFrontieresDB.Examen;";
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  // traitement
  public async filterTraitements(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    let queryText = "SELECT * FROM TP3VetoSansFrontieresDB.Traitement;";
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  // facture
  public async filterMultiTraitements(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    let queryText = "SELECT * FROM TP3VetoSansFrontieresDB.MultipleTraitement;";
    const res = await client.query(queryText);
    client.release();
    return res;
  }
}
