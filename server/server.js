import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/db.js';
import foodRouter from './routers/foodRouter.js';
import cookRouter from './routers/cookRouter.js';
import serverRouter from './routers/serverRouter.js';
import orderRouter from './routers/orderRouter.js';

const app = express();

const PORT = process.env.PORT || 3000; 

await connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send("Server is Running"));
app.use('/api/food', foodRouter);
app.use('/api/cook', cookRouter);
app.use('/api/server', serverRouter);
app.use('/api/order', orderRouter);

app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}`));