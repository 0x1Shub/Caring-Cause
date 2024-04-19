import { newDonation } from '../controllers/donation.js';
import { adminOnly } from './../middlewares/auth.js';
import express from 'express';

const app = express.Router();

// Route - /api/v1/user/new
app.post('/new', newDonation);



export default app; 