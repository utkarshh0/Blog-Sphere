import { Router, Request, Response } from 'express'
import Blog from '../model/blogModel'
import mongoose from 'mongoose'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
})

router.get('/blog/:id', async (req: Request, res: Response) => {
    
    try{
        const {id} = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid Blog ID' });
        }

        const blog = await Blog.findById(id)

        if(!blog) res.status(404).json({msg: 'Blog not found'})
        res.json(blog)
    }
    catch(error:any){
        res.status(500).json({ error: error.message });
    }
})

router.post('/post', async (req: Request, res: Response) => {

    try{
        const{ title, author, content, email } = req.body
        const blog = new Blog({title, content, author, email})
        await blog.save()
        res.status(201).json(blog)
    }
    catch(error:any){
        res.status(500).json({error: error.message})
    }
})

router.put('/:id', async(req: Request, res: Response) => {
    
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid Blog ID' });
        }

        const { title, content } = req.body;
        const blog = await Blog.findByIdAndUpdate(id, { title, content }, { new: true });
        if (!blog) {
            return res.status(404).json({ msg: 'Blog not found' });
        }
        res.json(blog);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
})

router.delete('/blog/:id', async (req: Request, res: Response) => {
    
    try {

        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid Blog ID' });
        }

        const result = await Blog.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        res.json({ message: 'Blog deleted successfully' });
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
})

export default router
