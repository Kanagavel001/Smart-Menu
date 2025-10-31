import express from 'express'
import { upload } from '../configs/multer.js';
import { addServer, getServers } from '../controllers/serverController.js';

const serverRouter = express.Router();

serverRouter.post('/add', upload.single('image'), addServer);
serverRouter.get('/get', getServers);

export default serverRouter;