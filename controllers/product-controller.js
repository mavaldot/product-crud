import ProductService from "../services/product-service.js";

class ProductController {

    async getProducts(req, res) {
        try {
            const products = await ProductService.getProducts();
            return res.send(products);
        }
        catch (err) {
            console.log(err);
            res.send(`Error:\n ${err}`);
        }
    }

    async createProduct(req, res) {
        try {
            let product = await req.body;
            const createdProduct = await ProductService.createProduct(product);
            return res.send(createdProduct);
        }
        catch (err) {
            console.log(err);
            return res.status(409).send(`Error:\n ${err}`);
        }
    }

    async updateProduct(req, res) {
        try {
            const product = await ProductService.findProductById(req.params.id);
            if (product == null) {
                return res.status(409).send(`Product does not exist`);
            }
            const updatedProduct = await ProductService.updateProduct(req.params.id, req.body);
            return res.send(updatedProduct);
        }
        catch (err) {
            return res.status(409).send(`Error:\n${err}`)
        }
    } 
    
    async getProduct(req, res) {
        try {
            const product = await ProductService.findProductById(req.params.id);
            if (product == null) {
                return res.status(409).send(`Product does not exist`);
            }
            return res.send(product);
        }
        catch (err) {
            return res.status(409).send(`Error:\n ${err}`);
        }
    }

    async deleteProduct(req, res) {
        try {
            const product = await ProductService.findProductById(req.params.id);
            if (product == null) {
                return res.status(409).send(`Product does not exist`);
            }
            let deletedProduct = await ProductService.deleteProduct(req.params.id);
            return res.send(deletedProduct);
        }
        catch (err) {
            return res.status(409).send(`Error:\n ${err}`);
        }
    }

}

export default new ProductController();