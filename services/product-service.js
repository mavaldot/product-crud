import ProductModel from '../models/product-model.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class ProductService {

    async getProducts() {
        try {
            const products = await ProductModel.find({});
            return products;
        }
        catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }

    async createProduct(input) {
        try {
            const product = await ProductModel.create(input)
            return product;
        }
        catch (err) {
            throw new Error(err)
        }
    }

    async updateProduct(id, input) {
        try {
            const product = await ProductModel.findOneAndUpdate({_id: id}, input, {
                new: true,
            });
            return product?.toJSON();
        }
        catch (err) {
            throw new Error(err);
        }
    }

    async findProductById(id) {
        try {
            const product = await ProductModel.findOne({_id: id});
            return product;
        }
        catch (err) {
            throw new Error(err);
        }
    }

    async deleteProduct(id) {
        try {
            const product = await ProductModel.deleteOne({ _id: id });
            return product;
          } catch (e) {
            throw new Error(e);
          }
    }
    
}

export default new ProductService();