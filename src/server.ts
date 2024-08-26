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
    origin: 'https://blogg-sphere.netlify.app/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use('/api/v1/user', userRoute);
app.use('/api/v1/user/blog', authMiddleware, blogRoute);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
