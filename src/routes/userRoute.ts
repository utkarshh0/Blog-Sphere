import { Router, Request, Response } from 'express'
import User from '../model/userModel'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

const router = Router();

router.post('/signin', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ error: 'User does not exist' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        const token = jwt.sign({
            id:user._id,
            email: user.email,
            username: user.username
        }, JWT_SECRET)

        res.json({
            message: `Sign in successful ${JWT_SECRET}`,
            token,
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
});

router.post('/signup', async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' })
        }

        const hashed = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: hashed
        });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully' })
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
});

export default router
