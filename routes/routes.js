import express from 'express';
import UserModel from '../models/user.model.js'

function routes(app) {
    app.get('/api/user', async (req, res) => {
        console.log(`hello user`);
        try {
            const users = await UserModel.find({});
            res.send(users);
        }
        catch (err) {
            console.log(err);
            res.send(err);
        }

    });
    app.post('/api/user', async (req, res) => {
        try {
            console.log(req);
            const {name, email, username, identification, password, active} = req.body;
            const user = new UserModel({
                name, email, username, identification, password, active
            });
            const newUser = await user.save();
            res.send(200);
        }
        catch (err) {
            console.log(err);
            res.send(err)
        }
    })
}

export default routes;