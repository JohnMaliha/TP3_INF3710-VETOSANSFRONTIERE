export interface Facture{
    noproprietaire :number;
    noanimal :number;
    noemploye : number;
    datefacture : string;
    listetraitement : string;
    total :number;
    modedepaiement :string;
    paiementeffectuer :boolean;
}