import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Checkin Routes

routes.use(authMiddleware);

// Help Orders Routes (Student):
//  - POST (Create help order with ID)
//  - GET (List all help orders of a student)

routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

// Plan Routes (Get, Post, Put, Delete)

// Registration Routes (Get, Post, Put, Delete)

// Help Orders Routes (Admin):
//  - Index (Listar pedidos sem resposta)
//  - Post (Responder um pedido)

export default routes;
