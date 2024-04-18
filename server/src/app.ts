import express from 'express';

// importing routes
import userRoute from './routes/user.js';

const app = express();

const PORT = 3000;

// using routes
app.use('/api/v1/user', userRoute);


app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
})