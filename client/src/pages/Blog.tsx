import BlogCard from "../Components/BlogCard";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddBlog from "../Components/AddBlog";
import BlogPost from "../Components/BlogPost";

interface BlogPostProps {
    _id: string;
    title: string;
    content: string;
    author: string;
    email: string;
    createdAt: Date;
}

type BlogArray = BlogPostProps[];

const Blog: React.FC = () => {
    const [blogs, setBlogs] = useState<BlogArray>([]);
    const [addBlog, setAddBlog] = useState(false);
    const [blogPost, setBlogPost] = useState(false);
    const [currentBlog, setCurrentBlog] = useState<BlogPostProps | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get<BlogArray>('https://blog-sphere-noql.onrender.com/blog', {
                    headers: {
                        Authorization: localStorage.getItem('token') || ''
                    }
                });
                setBlogs(response.data);
            } catch (error : any) {
                navigate('/');
                console.error('Error fetching blogs:', error.response?.data || error.message);
            }
        };

        fetchBlogs();
    }, [navigate]);

    if (addBlog) return <AddBlog onClick={() => setAddBlog(false)} />;
    if (blogPost && currentBlog) return <BlogPost currentBlog={currentBlog} onClick={() => setBlogPost(false)} />;
    
    return (
        <>
            <div className="w-screen h-screen overflow-x-hidden p-16 md:p-16 lg:p-24">
                <div onClick={() => setAddBlog(true)} className="text-4xl p-3 border-b">
                    <button className="cursor-pointer hover:opacity-50"><IoIosAddCircleOutline /></button>
                </div>
                {blogs.map(blog => (
                    <BlogCard 
                        key={blog._id} 
                        blog={blog} 
                        onClick={() => { setBlogPost(true); setCurrentBlog(blog); }}
                    />
                ))}
            </div>
        </>
    );
}

export default Blog;
