import Cook from "../models/Cook.js";
import Food from "../models/Food.js";
import Order from "../models/Order.js";
import Server from "../models/Server.js";


export const createOrder = async (req, res) => {
    try {
        const { cartItems, cartAmount, table_no } = JSON.parse(req.body.orderData);2

        await Order.create({
            foodDetails: cartItems,
            totalAmount: cartAmount,
            table_no
        })
        res.json({success: true, message: "Foods are successfully ordered"})
    } catch (error) {
        res.json({success: false, message: error.message})      
    }
}

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({createdAt: -1})
        res.json({success: true, orders})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const updateFoodStatus = async (req, res) => {
    try {
        const { foodId, orderId } = req.body;
        await Order.updateOne(
            { _id: orderId, 'foodDetails._id': foodId },
            { $set: { 'foodDetails.$.status': true } }
        );
        const order = await Order.findById(orderId);
        const hasPendingFood = order.foodDetails.some(food => food.status === false);
        if (!hasPendingFood) {
            order.foodStatus = true;
            await order.save();
        }
        res.json({success: true, message: "Food status updated"});
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.body;
        const order = await Order.findById(orderId);
        if(order.foodStatus){
            await Order.findByIdAndUpdate(orderId, {orderStatus: true});
            res.json({success: true, message: "Order is Completed"});
        }else{
            res.json({success: false, message: "Serve all foods in the order"});
        }
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const deleteOrders = async (req, res) => {
    try {
        await Order.deleteMany({
            $and: [
                {orderStatus: true},
                {paid: true}
            ]
        });
        res.json({success: true, message: "Orders are deleted"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const offlinePayment = async (req, res) => {
    try {
        const { orderId } = req.body;
        const order = await Order.findById(orderId);
        if(order.orderStatus){
            await Order.findByIdAndUpdate(orderId, {paid: true});
            res.json({success: true, message: "Payment successfully paid"});
        }else{
            res.json({success: false, message: "Serve all foods in the order"});
        }
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const getDashboardData = async (req, res) => {
    try {
        const cooksCount = await Cook.countDocuments();
        const serversCount = await Server.countDocuments();
        const ordersCount = await Order.countDocuments();
        const foodsCount = await Food.countDocuments();
        const orders = await Order.find({});
        let totalRevenue = 0;
        for(let i = 0; i < orders.length; i++){
            if(orders[i].paid){
                totalRevenue += orders[i].totalAmount;
            }
        }

        res.json({success: true, cooksCount, serversCount, foodsCount, ordersCount, totalRevenue})
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}