import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoute from './routes/userRoute';
import blogRoute from './routes/blogRoute';
import connectDB from './db';
import authMiddleware from './middleware/authMiddleware';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors({
    origin: 'https://blogg-sphere.netlify.app',
    // origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use('/user', userRoute);
app.use('/blog', authMiddleware, blogRoute);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
