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

je veux faire ça

pour l'instant j'ai ça, je crée quoi dans le backend?

[nodemon] 3.1.14
[nodemon] to restart at any time, enter rs
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting node server.js
Serveur démarré sur le port 3001
npx jest tests/e2e.test.js --runInBandTerminate batch job (Y/N)? n

C:\Users\helsy\Syllabus projet\taskmanagement_HAN\backend>npx jest tests/e2e.test.js --runInBand
 FAIL  tests/e2e.test.js (8.968 s)
  ● Tests E2E avec Selenium › Connexion utilisateur réussie

    thrown: "Exceeded timeout of 5000 ms for a hook.
    Add a timeout value to this test to increase the timeout, if this is a long-running test. See https://jestjs.io/docs/api#testname-fn-timeout."

      4 |                 let driver;
      5 |
    > 6 |                 beforeAll(async () => {
        |                 ^
      7 |                                 driver = await new Builder()
      8 |                                                 .forBrowser('chrome')
      9 |                                                 .build();

      at beforeAll (tests/e2e.test.js:6:17)
      at Object.describe (tests/e2e.test.js:3:1)


  ● Test suite failed to run

    TypeError: Cannot read properties of undefined (reading 'quit')

      11 |
      12 |                 afterAll(async () => {
    > 13 |                                 await driver.quit();
         |                                              ^
      14 |                 });
      15 |
      16 |                 test('Connexion utilisateur réussie', async () => {

      at Object.quit (tests/e2e.test.js:13:46)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        9.205 s
Ran all test suites matching /tests\\e2e.test.js/i.

DevTools listening on ws://127.0.0.1:62571/devtools/browser/721f5f95-2f09-4171-b49a-4f148a28b888
Jest did not exit one second after the test run has completed.

'This usually means that there are asynchronous operations that weren't stopped in your tests. Consider running Jest with --detectOpenHandles to troubleshoot this issue.

C:\Users\helsy\Syllabus projet\taskmanagement_HAN\backend>[10388:14648:0831/161039.910:ERROR:google_apis\gcm\engine\registration_request.cc:291] Registration response error message: DEPRECATED_ENDPOINT
[10388:14648:0831/161039.971:ERROR:google_apis\gcm\engine\mcs_client.cc:702]   Error code: 401  Error message: Authentication Failed: wrong_secret
[10388:14648:0831/161039.971:ERROR:google_apis\gcm\engine\mcs_client.cc:704] Failed to log in to GCM, resetting connection.
Created TensorFlow Lite XNNPACK delegate for CPU.
[10388:14648:0831/161104.993:ERROR:google_apis\gcm\engine\registration_request.cc:291] Registration response error message: DEPRECATED_ENDPOINT

ensuite??

Oui, là c’est bon ✅

Tu as maintenant :

Tests unitaires : OK
Tests d’intégration : OK
12 tests passés sur 12
Couverture globale : ~69%
taskUtils.js est couvert à 100%
server.js est couvert à environ 68–69%

Les lignes non couvertes sont listées ici :

50,59-88,99,116,126-130,138,155,163,180,187,196-197,207,212-213

Donc ta partie “métriques de couverture de code” est bien fonctionnelle.

La prochaine étape utile est de compléter les tests E2E Selenium avec :

création d’une tâche
modification d’une tâche
suppression d’une tâche

Comme ça, tu auras les 3 catégories vraiment complètes, puis on pourra préparer le README avec les résultats et les commandes utilisées.

je met quoi dans mon README

Tu peux mettre une section dédiée aux tests, claire et simple. Vu ce que tu as déjà fait, je te conseille de mettre quelque chose comme ça dans le README.

Tests

Le projet contient trois types de tests :

Tests unitaires

Les tests unitaires vérifient individuellement certaines fonctions utilisées dans l’application.

Fichier :

backend/tests/unit.test.js

Ils vérifient notamment :

- la validité des priorités
- la validité des statuts

Commande :

npx jest tests/unit.test.js --runInBand

Résultat :

4 tests passés sur 4
Tests d’intégration

Les tests d’intégration permettent de vérifier le bon fonctionnement de l’API et des différentes routes du backend.

Fichier :

backend/tests/integration.test.js

Les éléments testés sont notamment :

- GET /health
- connexion avec des identifiants valides
- refus de connexion avec un mauvais mot de passe
- refus d’accès aux tâches sans token
- récupération des tâches
- création d’une tâche
- modification d’une tâche
- suppression d’une tâche

Commande :

npx jest tests/integration.test.js --runInBand

Résultat :

8 tests passés sur 8
Tests E2E avec Selenium

Les tests E2E simulent le comportement d’un utilisateur directement dans le navigateur.

Fichier :

backend/tests/e2e.test.js

Un premier scénario a été implémenté :

- ouverture de l’application
- saisie de l’email et du mot de passe
- clic sur le bouton de connexion
- vérification de la redirection vers /dashboard

Commande :

npx jest tests/e2e.test.js --runInBand

Résultat :

1 test E2E passé
Couverture de code

La couverture est générée avec Jest.

Commande :

npm run test:coverage

Résultats obtenus :

Couverture globale :

Statements : 69.07 %
Branches   : 63.41 %
Functions  : 61.9 %
Lines      : 70.32 %

Le fichier :

backend/utils/taskUtils.js

atteint une couverture de :

100 %

Le fichier :

backend/server.js

atteint environ :

68 % des statements
63 % des branches
58 % des fonctions
69 % des lignes
Organisation des tests
backend/
├── tests/
│   ├── unit.test.js
│   ├── integration.test.js
│   └── e2e.test.js
├── utils/
│   └── taskUtils.js
└── server.js
Difficultés rencontrées

Lors de la mise en place de la couverture de code, une incompatibilité liée à la dépendance minimatch empêchait Jest de générer correctement la couverture.

L’erreur rencontrée était :

TypeError: minimatch is not a function

Le problème a été corrigé en supprimant l’override forcé de minimatch dans le fichier package.json, puis en réinstallant les dépendances avec :

npm install

Une autre difficulté concernait les tests Selenium. Le démarrage de Chrome dépassait le délai par défaut de Jest de 5 secondes.

Le délai a donc été augmenté avec :

jest.setTimeout(30000);

Cela a permis au test E2E de s’exécuter correctement.

Tu peux mettre exactement cette partie dans ton README. Elle répond bien à ce que le prof demande : étapes, tests réalisés, résultats, erreurs rencontrées et solutions trouvées.

le fichier stp

Oui — voici le fichier prêt à utiliser :

Télécharger le README des tests

Tu peux soit le garder comme fichier séparé, soit copier son contenu dans votre README.md principal. 

README_tests.md
Document

Bibliothèque
/
README_tests.md
Task Management

Application web collaborative de gestion de tâches.

Tests

Le projet contient trois types de tests : tests unitaires, tests d'intégration et tests E2E avec Selenium.

Tests unitaires

Les tests unitaires vérifient individuellement certaines fonctions utilisées dans l'application.

Fichier :

backend/tests/unit.test.js

Ils vérifient notamment :

la validité des priorités ;
la validité des statuts.

Commande :

npx jest tests/unit.test.js --runInBand

Résultat :

4 tests passés sur 4
Tests d'intégration

Les tests d'intégration permettent de vérifier le bon fonctionnement de l'API et des différentes routes du backend.

Fichier :

backend/tests/integration.test.js

Les éléments testés sont notamment :

GET /health ;
connexion avec des identifiants valides ;
refus de connexion avec un mauvais mot de passe ;
refus d'accès aux tâches sans token ;
récupération des tâches ;
création d'une tâche ;
modification d'une tâche ;
suppression d'une tâche.

Commande :

npx jest tests/integration.test.js --runInBand

Résultat :

8 tests passés sur 8
Tests E2E avec Selenium

Les tests E2E simulent le comportement d'un utilisateur directement dans le navigateur.

Fichier :

backend/tests/e2e.test.js

Un premier scénario a été implémenté :

ouverture de l'application ;
saisie de l'email et du mot de passe ;
clic sur le bouton de connexion ;
vérification de la redirection vers /dashboard.

Commande :

npx jest tests/e2e.test.js --runInBand

Résultat :

1 test E2E passé
Couverture de code

La couverture de code est générée avec Jest.

Commande :

npm run test:coverage

Résultats obtenus :

Statements : 69.07 %
Branches   : 63.41 %
Functions  : 61.9 %
Lines      : 70.32 %

Le fichier backend/utils/taskUtils.js atteint une couverture de 100 %.

Le fichier backend/server.js atteint environ :

Statements : 68.08 %
Branches   : 63.41 %
Functions  : 57.89 %
Lines      : 69.31 %
Organisation des tests
backend/
├── tests/
│   ├── unit.test.js
│   ├── integration.test.js
│   └── e2e.test.js
├── utils/
│   └── taskUtils.js
└── server.js
Difficultés rencontrées

Lors de la mise en place de la couverture de code, une incompatibilité liée à la dépendance minimatch empêchait Jest de générer correctement la couverture.

Erreur rencontrée :

TypeError: minimatch is not a function

Le problème a été corrigé en supprimant l'override forcé de minimatch dans le fichier package.json, puis en réinstallant les dépendances :

npm install

Une autre difficulté concernait les tests Selenium. Le démarrage de Chrome dépassait le délai par défaut de Jest de 5 secondes.

Le délai a été augmenté avec :

jest.setTimeout(30000);

Cela a permis au test E2E de s'exécuter correctement.