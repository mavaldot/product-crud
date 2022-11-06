import express from 'express';
import UserModel from '../models/user-model.js'
import UserController from '../controllers/user-controller.js';

function routes(app) {
    app.get('/api/user', UserController.getUsers);
    app.get('/api/user/:id', UserController.getUser);
    app.post('/api/user', UserController.createUser);
    app.put('/api/user/:id', UserController.updateUser);
    app.delete('/api/user/:id', UserController.deleteUser);
    
    
}

export default routes;