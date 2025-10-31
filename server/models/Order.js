import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    table_no: {type: Number, required: true},
    orderStatus: {type: Boolean, default: false},
    foodStatus: {type: Boolean, default: false},
    foodDetails: {type: Array, required: true, ref: "Food"},
    totalAmount: {type: Number, required: true},
    paid: {type: Boolean, default: false}
}, {timestamps: true})

const Order = mongoose.model('Order', orderSchema);

export default Order;