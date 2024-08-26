import { Schema, model, Document } from "mongoose"

interface Blog extends Document{
    title: string,
    content: string,
    author: string,
    email: string,
    createdAt: Date,
    updatedAt: Date
}

const blogSchema = new Schema<Blog>({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
}, 
{
    timestamps: true
})

export default model<Blog>('Blog', blogSchema)
