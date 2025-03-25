# Installation et exécution du projet

## Prérequis
- Git doit être installé sur votre machine.
- Docker Desktop doit être installé et en cours d'exécution.

## Installation

1. **Cloner le projet**
   ```sh
   git clone <URL_DU_DEPOT>
   cd <NOM_DU_REPERTOIRE>
   ```

2. **Lancer Docker Desktop** (si ce n'est pas déjà fait).

3. **Démarrer les services Docker**
   ```sh
   docker-compose up -d
   ```

## Tests de fonctionnement

1. **Vérifier que l'API est bien démarrée**
   - Accéder à [http://localhost:3000](http://localhost:3000)
   - Vous devriez voir le message :
     ```
     API Express fonctionne avec PostgreSQL!
     ```

2. **Vérifier la connexion à la base de données**
   - Accéder à [http://localhost:3000/test-db](http://localhost:3000/test-db)
   - Vous devriez voir le message :
     ```
     Base de données connectée avec succès
     ```
   - Suivi du datetime actuel récupéré via la requête SQL :
     ```sql
     SELECT NOW();
     ```

3. **Vérifier les logs**
   - Un fichier `logs/app.log` doit avoir été généré avec le datetime de l'action ainsi que les messages suivants en cas de succès :
     ```
     Connexion réussie à la base de données
     Requête réussie à la base de données : {"now":"<DATETIME ACTUEL>"}
     ```
   - En cas d'erreur, des logs d'erreur seront générés à la place.

## Déploiement

- Un fichier `docker-publish.yml` est disponible pour automatiser le déploiement.
- Vous ne pourrez pas tester cette action car elle est configurée pour mon compte personnel.

---

Si vous rencontrez des problèmes, assurez-vous que Docker Desktop est bien lancé et que les ports ne sont pas déjà utilisés par une autre application.
