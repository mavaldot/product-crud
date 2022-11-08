import express from 'express';
import UserController from '../controllers/user-controller.js';
import ProductController from '../controllers/product-controller.js';

function routes(app) {
    app.get('/api/user', UserController.getUsers);
    app.get('/api/user/:id', UserController.getUser);
    app.post('/api/user', UserController.createUser);
    app.put('/api/user/:id', UserController.updateUser);
    app.delete('/api/user/:id', UserController.deleteUser);
    app.post('/api/user/login',UserController.login);

    app.get('/api/product', ProductController.getProducts);
    app.get('/api/product/:id', ProductController.getProduct);
    app.post('/api/product', ProductController.createProduct);
    app.put('/api/product/:id', ProductController.updateProduct);
    app.delete('/api/product/:id', ProductController.deleteProduct);
    
    
}

export default routes;