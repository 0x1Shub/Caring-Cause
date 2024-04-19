import express from 'express';

// importing routes
import userRoute from './routes/user.js';
import { connectDB } from './utils/features.js';
import { errorMiddleware } from './middlewares/error.js';
import NodeCache from 'node-cache';
import {config} from 'dotenv';
import morgan from "morgan";


import campaignRoute from './routes/campaigns.js';
import donartionRoute from './routes/donation.js';

const app = express();

config({
    path: "./.env"
})

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI || "";

connectDB(mongoURI);

export const myCache = new NodeCache();

app.use(express.json());
app.use(morgan("dev"));

// using routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/campaign', campaignRoute);
app.use('/api/v1/donation', donartionRoute);

app.get('/', (req, res) => {
    res.send('Hello Express');
})

app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
})