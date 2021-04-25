# INF3710_tp3

TP3 INF3710

## Avant de lancer le projet
- Assurez-vous que Postgres roule sur vos machines 

- Vérifiez que vous avez NodeJs installé avec `node –v`, si vous ne l'avez pas fait, veuillez suivre les étapes dans les dispos du labo

- Allez dans `/client`  et lancez `npm install`

- Allez dans `/server` et lancez `npm install​`

- Allez dans `/server/app/services/database.service.ts` et modifiez `connectionConfig` avec les bons paramètres de votre BD​

## Pour lancer le projet

- Allez dans `/server` et faites `npm start`​

- Allez dans `/client` et faites `npm start`​

## Si la  DB est connecté et rien ne s'affiche, basculer sur server (cd server) et faites : 
- npm uninstall pg
- npm uninstall pg-pool
- npm install pg 
