import express from 'express';
import { createOrder, deleteOrders, getDashboardData, getOrders, offlinePayment, updateFoodStatus, updateOrderStatus } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/create', createOrder);
orderRouter.get('/get-all', getOrders);
orderRouter.post('/update-foodStatus', updateFoodStatus);
orderRouter.post('/update-orderStatus', updateOrderStatus);
orderRouter.delete('/delete', deleteOrders);
orderRouter.post('/pay-offline', offlinePayment);
orderRouter.get('/dashboard-data', getDashboardData);

export default orderRouter;