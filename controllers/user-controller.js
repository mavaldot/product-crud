import UserService from "../services/user-service.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

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
    async getUser(req, res) {
        try {
            const user = await UserService.findUserById(req.params.id);
            console.log(user.password)
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
    async login(req, res) {
        try {
          const user = await UserService.findUserByEmail(req.body.email);
          console.log(user.password)
          console.log(req.body.password)
          if (
            user !== null &&
            (await bcrypt.compare(req.body.password, user.password))
          ) {
            const token = jwt.sign(
              { user_id: user._id, email: user.email },
              process.env.TOKENSECRET,
              { expiresIn: "2h" }
            );
    
            return res
              .status(200)
              .send({ email: user.email, name: user.name, token });
          }
    
          return res.status(401).send("Invalid credentials");
        } catch (e) {
          console.log(e)
    
          return res.status(409).send(e.message);
        }
      }
    

}

export default new UserController();