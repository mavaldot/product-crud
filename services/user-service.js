import UserModel from '../models/user-model.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {

    async getUsers() {
        try {
            const users = await UserModel.find({});
            return users;
        }
        catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }

    async createUser(input) {
        try {
            const user = await UserModel.create(input)
            return user;
        }
        catch (err) {
            throw new Error(err)
        }
    }

    async updateUser(id, input) {
        try {
            const user = await UserModel.findOneAndUpdate({_id: id}, input, {
                new: true,
            });
            return user?.toJSON();
        }
        catch (err) {
            throw new Error(err);
        }
    }

    async findUserByEmail(email) {
        try {
            const user = await UserModel.findOne({email: email});
            return user;
        }
        catch (err) {
            throw new Error(err);
        }
    }

    async findUserById(id) {
        try {
            const user = await UserModel.findOne({_id: id});
            return user;
        }
        catch (err) {
            throw new Error(err);
        }
    }

    async findUserByUsername(username) {
        try {
            const user = await UserModel.findOne({username : username});
            return user;
        }
        catch (err) {
            throw new Error(err);
        }
    }

    async deleteUser(id) {
        try {
            const user = await UserModel.deleteOne({ _id: id });
            return user;
          } catch (e) {
            throw new Error(e);
          }
    }
}

export default new UserService();