import express from 'express'
import { upload } from '../configs/multer.js';
import { addFood, getFoods, updateAmount, updateStack } from '../controllers/foodController.js';

const foodRouter = express.Router();

foodRouter.post('/add', upload.single('image'), addFood);
foodRouter.get('/get',  getFoods);
foodRouter.post('/update-stack', updateStack);
foodRouter.post('/update-amount', updateAmount);

export default foodRouter;