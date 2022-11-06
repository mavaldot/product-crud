import UserService from "../services/user-service.js";
import bcrypt from 'bcrypt';

class UserController {

    async getUsers(req, res) {
        try {
            const users = await UserService.getUsers();
            return res.send(users);
        }
        catch (err) {
            console.log(err);
            res.send(`Error:\n ${err}`);
        }
    }

    async createUser(req, res) {
        try {
            let user = await req.body;
            user.password = await bcrypt.hash(req.body.password, 10);
            const createdUser = await UserService.createUser(user);
            return res.send(createdUser);
        }
        catch (err) {
            console.log(err);
            return res.status(409).send(`Error:\n ${err}`);
        }
    }

    async updateUser(req, res) {
        try {
            const user = await UserService.findUserById(req.params.id);
            if (user == null) {
                return res.status(409).send(`User does not exist`);
            }

            if (req.body.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }

            const updatedUser = await UserService.updateUser(req.params.id, req.body);
            return res.send(updatedUser);
        }
        catch (err) {
            return res.status(409).send(`Error:\n${err}`)
        }
    } 
    
    async getUser(req, res) {
        try {
            const user = await UserService.findUserById(req.params.id);
            if (user == null) {
                return res.status(409).send(`User does not exist`);
            }
            user.password = '';
            return res.send(user);
        }
        catch (err) {
            return res.status(409).send(`Error:\n ${err}`);
        }
    }

    async deleteUser(req, res) {
        try {
            const user = await UserService.findUserById(req.params.id);
            if (user == null) {
                return res.status(409).send(`User does not exist`);
            }
            let deletedUser = await UserService.deleteUser(req.params.id);
            return res.send(deletedUser);
        }
        catch (err) {
            return res.status(409).send(`Error:\n ${err}`);
        }
    }

}

export default new UserController();