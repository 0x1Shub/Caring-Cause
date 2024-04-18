import express from 'express';

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send("Hello Express");
});


app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
})