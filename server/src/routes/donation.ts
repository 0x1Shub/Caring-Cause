import { allDonations, deleteDonation, getSingleDonation, myDonations, newDonation, processDonation } from '../controllers/donation.js';
import { adminOnly } from './../middlewares/auth.js';
import express from 'express';

const app = express.Router();

// Route - /api/v1/user/new
app.post('/new', newDonation);

app.get('/my', myDonations);

app.get('/all', adminOnly, allDonations);

app.route('/:id').get(getSingleDonation).put(adminOnly, processDonation).delete(deleteDonation);


export default app; 