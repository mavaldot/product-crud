import express from 'express';
import UserController from '../controllers/user-controller.js';
import ProductController from '../controllers/product-controller.js';
import verifyToken from  '../middleware/auth.js';

function routes(app) {
    app.get('/api/user', UserController.getUsers);
    app.get('/api/user/:id',verifyToken, UserController.getUser);
    app.post('/api/user', UserController.createUser);
    app.put('/api/user/:id',verifyToken,  UserController.updateUser);
    app.delete('/api/user/:id',verifyToken, UserController.deleteUser);
    app.post('/api/user/login',UserController.login);

    app.get('/api/product', ProductController.getProducts);
    app.get('/api/product/:id', ProductController.getProduct);
    app.post('/api/product', ProductController.createProduct);
    app.put('/api/product/:id', verifyToken, ProductController.updateProduct);
    app.delete('/api/product/:id',verifyToken, ProductController.deleteProduct);
    
    
}

export default routes;