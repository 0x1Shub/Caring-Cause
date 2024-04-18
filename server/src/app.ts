import express from 'express';

// importing routes
import userRoute from './routes/user.js';
import { connectDB } from './utils/features.js';
import { errorMiddleware } from './middlewares/error.js';

const app = express();

const PORT = 3000;

connectDB();

app.use(express.json());

// using routes
app.use('/api/v1/user', userRoute);

app.get('/', (req, res) => {
    res.send('Hello Express');
})

app.use(errorMiddleware);

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
})