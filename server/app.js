import express from 'express';
import userRoute from './routes/userRoute.js';
import { connectDB } from './utils/features.js';
import dotenv from 'dotenv'
import { errorMiddleware } from './middlewares/error.js';
dotenv.config({
    path:"./.env",
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000
connectDB(mongoURI)

const app = express();
app.use(express.json());
 

app.get('/', (req, res) => {
    res.send("helo from app.js")
})

app.use('/user',userRoute)

app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})