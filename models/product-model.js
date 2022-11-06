import mongoose, { mongo } from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    }
}, {timestamps: true});

const ProductModel = mongoose.model('Product', ProductSchema);

export default ProductModel;