import express from 'express';
import NodeCache from 'node-cache';
import {config} from 'dotenv';
import morgan from "morgan"; 
import Stripe from 'stripe';
import cors from 'cors';


import { connectDB } from './utils/features.js';
import { errorMiddleware } from './middlewares/error.js';

// importing routes
import userRoute from './routes/user.js';
import campaignRoute from './routes/campaigns.js';
import donationRoute from './routes/donation.js';
import transactionRoute from './routes/transaction.js';


const app = express();

config({
    path: "./.env"
})

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI || "";
const stripeKey = process.env.STRIPE_KEY || "";

connectDB(mongoURI);

export const stripe = new Stripe(stripeKey);
export const myCache = new NodeCache();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// using routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/campaign', campaignRoute);
app.use('/api/v1/donation', donationRoute); 
app.use('/api/v1/transaction', transactionRoute);

app.get('/', (req, res) => {
    res.send('Hello Express');
})

app.use("/uploads", express.static("uploads"));

app.use(errorMiddleware);

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
})