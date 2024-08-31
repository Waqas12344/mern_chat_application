import express from 'express';
import userRoute from './routes/userRoute.js';
import { connectDB } from './utils/features.js';
import dotenv from 'dotenv'
const app = express();
dotenv.config({
    path:"./.env",
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000
 connectDB(mongoURI)

app.get('/', (req, res) => {
    res.send("helo from app.js")
})

app.use('/user',userRoute)


app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})