import express from 'express'
import { upload } from '../configs/multer.js';
import { addCook, getcook, getCooks } from '../controllers/cookController.js';

const cookRouter = express.Router();

cookRouter.post('/add', upload.single('image'), addCook);
cookRouter.get('/get-all', getCooks);
cookRouter.get('/:id', getcook);

export default cookRouter;