import express from 'express';
import { adminOnly } from '../middlewares/auth.js';
import { deleteCampaign, getAdminCampaigns, getAllCampaigns, getAllCategories, getSingleCampaign, getlatestCampaign, newCampaign, updateCampaign } from '../controllers/campaign.js';
import { singleUpload } from '../middlewares/multer.js';

const app = express.Router();

// Create New Product - /api/v1/campaign/new
app.post('/new', singleUpload, newCampaign);

// get latest campaigns
app.get('/latest', getlatestCampaign);

// Get all campaigns with filter
app.get('/fundraisers', getAllCampaigns);

app.get('/categories', getAllCategories);

app.get('/admin/categories', adminOnly, getAdminCampaigns);

app.route('/:id').get(getSingleCampaign).put(singleUpload, updateCampaign).delete(adminOnly, deleteCampaign);

export default app;