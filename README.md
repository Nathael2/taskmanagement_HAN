# taskmanagement
Application de gestion de tâches
aujourd’hui 14:19
comment cloner un projet sur github
je veux revenir en arri‘re sortir du dossier l»
c'est un peu ça la structure de base 

### Terminal 1 Backend

```

cd backend

npm install

npm run dev

```

### Terminal 2 Frontend

```

cd frontend  

npm install

npm start
    
    

Création des branches

Auriane: feat/auriane
Nathael: 
Helsy: 

Worfklow Git
Nous veillons au workflow Git, c'est-à-dire la règle que l'équipe suit pour ne jamais casser le code en travaillant à plusieurs.

Nous choisissons une branche main qui reste toujours stable et fonctionnelle. 

Chacun crée sa branche pour sa tâche, code dessus, puis ouvre une Pull Request pour la remettre dans main une fois relue par un coéquipier. Ça évite que quelqu'un pousse du code cassé ou en conflit avec ce que font les autres.

Chacun crée sa branche: 
Auriane: feat/auriane
Nathael: 
Helsy: 

Attribution des équipes

Nathael: DevOps
Helsy : Test backend
Auriane: Test frontend

Création des issues

Une Issue = une tâche à faire dans le projet, qui permet de suivre qui fait quoi et où ça en est.

Issue #1 — Tester la page de connexion
Issue #2 — Tester la page d'inscription
Issue #3 — Tester la création d'une tâche
Issue #4 — Ajouter la suppression d'une tâche
Issue #5 — Ajouter la modification d'une tâche
Issue #6 — Connecter l'application à la base de données
Issue #7 — Tester l'authentification

Rajouter ça au README.md

6. Tests unitaires, E2E et d'intégration

1. Les tests unitaires
Les tests unitaires examinent chaque fonction ou méthode de manière isolée.
Leur principal atout réside dans leur rapidité d’exécution et leur capacité à identifier précisément l’origine d’un bug. Quand un test unitaire échoue, vous savez exactement quelle portion de code pose problème.
Leur coût de maintenance reste faible puisqu’ils ne dépendent d’aucune infrastructure externe, ce qui explique pourquoi ils constituent la fondation la plus large de la pyramide.

2. Les tests d’intégration
Au niveau intermédiaire se situent les tests d’intégration qui vérifient que vos composants communiquent correctement entre eux et avec les services externes comme les bases de données ou les APIs tierces.
Un module peut fonctionner parfaitement en isolation tout en provoquant des erreurs lorsqu’il interagit avec d’autres parties du système. Les tests d’intégration capturent précisément ces défaillances qui échappent aux tests unitaires, validant ainsi la cohérence globale de votre architecture.

3. Les tests end-to-end (E2E)
Un test E2E reproduit exactement ce que ferait un utilisateur (se connecter, naviguer dans l’interface, remplir un formulaire, valider une transaction).
Cette approche offre une validation globale du système dans des conditions proches de la production.
Cependant, les tests end-to-end nécessitent aussi des compétences spécifiques pour éviter qu’ils ne deviennent fragiles et sources de faux positifs
La pyramide suggère une proportion : beaucoup de tests unitaires, un nombre moyen de tests d’intégration, et quelques tests E2E ciblés sur les parcours critiques.



Note: Auriane a rencontré des difficultés durant le TP à cause d'un compte Github auquel elle ne parvenait plus à se connecter. Elle a travailllé sur le projet mais n'a pas pu pousser sa branche.
