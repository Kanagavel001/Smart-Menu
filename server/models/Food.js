import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {type: String, required: true},
    category: {type: String, required: true},
    amount: {type: Number, required: true},
    image: {type: String, required: true},
    stack: {type: Boolean, default: false},
    quantity: {type: Number, default: 0},
    status: {type: Boolean, default: false}
});

const Food = mongoose.model('Food', foodSchema);

export default Food;