const request = require('supertest');
const app = require('../server');

let token;
let createdTaskId;

describe("Tests d'intégration", () => {

                test('GET /health retourne 200 et OK', async () => {
                                const response = await request(app).get('/health');

                                expect(response.statusCode).toBe(200);
                                expect(response.body.status).toBe('OK');
                });

                test('Connexion avec des identifiants valides', async () => {
                                const response = await request(app)
                                                .post('/api/auth/login')
                                                .send({
                                                                email: 'admin@test.com',
                                                                password: 'password'
                                                });

                                expect(response.statusCode).toBe(200);
                                expect(response.body).toHaveProperty('token');

                                token = response.body.token;
                });

                test('Connexion refusée avec un mauvais mot de passe', async () => {
                                const response = await request(app)
                                                .post('/api/auth/login')
                                                .send({
                                                                email: 'admin@test.com',
                                                                password: 'wrongpassword'
                                                });

                                expect(response.statusCode).toBe(400);
                });

                test('Accès aux tâches refusé sans token', async () => {
                                const response = await request(app)
                                                .get('/api/tasks');

                                expect(response.statusCode).toBe(401);
                });

                test('Récupération de la liste des tâches', async () => {
                                const response = await request(app)
                                                .get('/api/tasks')
                                                .set('Authorization', `Bearer ${token}`);

                                expect(response.statusCode).toBe(200);
                                expect(Array.isArray(response.body)).toBe(true);
                });

                test("Création d'une tâche", async () => {
                                const response = await request(app)
                                                .post('/api/tasks')
                                                .set('Authorization', `Bearer ${token}`)
                                                .send({
                                                                title: 'Tâche de test',
                                                                description: 'Créée avec Jest',
                                                                priority: 'high'
                                                });

                                expect(response.statusCode).toBe(201);
                                expect(response.body.title).toBe('Tâche de test');

                                createdTaskId = response.body.id;
                });

                test("Modification d'une tâche", async () => {
                                const response = await request(app)
                                                .put(`/api/tasks/${createdTaskId}`)
                                                .set('Authorization', `Bearer ${token}`)
                                                .send({
                                                                title: 'Tâche modifiée',
                                                                status: 'done'
                                                });

                                expect(response.statusCode).toBe(200);
                                expect(response.body.title).toBe('Tâche modifiée');
                                expect(response.body.status).toBe('done');
                });

                test("Suppression d'une tâche", async () => {
                                const response = await request(app)
                                                .delete(`/api/tasks/${createdTaskId}`)
                                                .set('Authorization', `Bearer ${token}`);

                                expect(response.statusCode).toBe(204);
                });

});