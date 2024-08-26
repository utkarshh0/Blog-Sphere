import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { CiEdit } from 'react-icons/ci';
import EditBlogModal from './EditBlogModal';
import { IoMdArrowBack } from 'react-icons/io';
import { jwtDecode } from "jwt-decode"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface BlogPostProps{
    onClick : (value: boolean) => void,
    currentBlog: {
        _id: string,
        title : string,
        content : string,
        author : string,
        email: string,
        createdAt: Date
    }
}

interface DecodedToken {
    email: string
}

const BlogPost: React.FC<BlogPostProps> = ({onClick, currentBlog}) => {
   
    const [userEmail, setUserEmail] = useState<string | null>(null)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [blogData, setBlogData] = useState({
        id: currentBlog._id,
        title: currentBlog.title,
        content: currentBlog.content,
        author: currentBlog.author,
        email: currentBlog.email,
        createdAt: currentBlog.createdAt
    })
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            try {
                const decodedToken = jwtDecode<DecodedToken>(token)
                setUserEmail(decodedToken.email)
            } catch (error) {
                console.error('Failed to decode token:', error)
            }
        }
    }, []);

    const handleEdit = () => {
        setIsEditModalOpen(true)
    };

    const handleSave = async (updatedData: { title: string; content: string }) => {
        setBlogData(prevData => ({
            ...prevData,
            ...updatedData,
        }))
        const token = localStorage.getItem('token'); // Retrieve token from localStorage

        if(token){
            try {
                await axios.put(
                    `https://blog-sphere-noql.onrender.com/blog/${blogData.id}`,
                    { 
                        title: updatedData.title, 
                        content: updatedData.content, 
                    },
                    {
                        headers: {
                            'Authorization': `${token}`, 
                            'Content-Type': 'application/json'
                        }
                    }
                )
                navigate('/blog')
            } catch (error: any) {
                console.error('Error posting blog:', error.response?.data || error.message);
            }
        }

    }

    return (
        <>http://localhost:3000/
            <div className="w-screen h-screen overflow-x-hidden p-20 my-1">
                <button onClick={() => onClick(false)} className=" text-3xl hover:opacity-75 border-b rounded-lg"><IoMdArrowBack /></button>
                <div className="flex justify-between my-1">
                    <div className="flex items-center gap-2">
                        <Avatar className="rounded-full" size="25" name={blogData.author} />
                        <p>{blogData.author}</p>
                        <p className="text-sm font-thin">{new Date(blogData.createdAt).toLocaleDateString()}</p>
                    </div>
                    {userEmail && userEmail === blogData.email ? 
                        <div className="text-4xl p-3 border-b">
                            <button className="cursor-pointer hover:opacity-50" onClick={handleEdit}>
                                <CiEdit />
                            </button>
                        </div>
                        :
                        ''
                    }
                </div>
                <div className="w-full h-full flex flex-col items-center">
                    <div className="w-3/5">
                        <p className="my-8 text-2xl font-extrabold">{blogData.title}</p>
                        <p className="text-lg">{blogData.content}</p>
                    </div>
                </div>
            </div>

            <EditBlogModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                data={{ title: blogData.title, content: blogData.content }}
                onSave={handleSave}
            />
        </>
    );
};

export default BlogPost;
