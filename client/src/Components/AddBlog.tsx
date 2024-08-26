import { IoMdArrowBack } from "react-icons/io"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import axios from "axios"
import { useNavigate } from "react-router-dom"

interface AddBlogProps{
    onClick: (value: boolean) => void
}

interface DecodedToken {
    email: string
    username: string
}

const AddBlog: React.FC<AddBlogProps> = ({onClick}) => {

    const [formData, setFormData] = useState({
        title: '',
        content: ''
    })
    const [userEmail, setUserEmail] = useState<string | null>(null)
    const [username, setUsername] = useState<string | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            try {
                const decodedToken = jwtDecode<DecodedToken>(token)
                setUserEmail(decodedToken.email)
                setUsername(decodedToken.username)
            } catch (error) {
                console.error('Failed to decode token:', error)
            }
        }
    }, []);

    const handleChange = (e : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const {name, value} = e.target

        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }
    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem('token'); // Retrieve token from localStorage

        if(token){
            try {
                await axios.post(
                    'http://localhost:3000/api/v1/user/blog/post',
                    { 
                        title: formData.title, 
                        content: formData.content, 
                        author: username,
                        email: userEmail
                    },
                    {
                        headers: {
                            'Authorization': `${token}`, 
                            'Content-Type': 'application/json'
                        }
                    }
                );
                onClick(false)
                navigate('/api/v1/user/blog')
            } catch (error: any) {
                console.error('Error posting blog:', error.response?.data || error.message);
            }
        }
    }
    return(
        <>
            <div className="w-screen h-screen px-8 py-16 md:p-12 lg:p-16">
                <button onClick={() => onClick(false)} className="my-2 text-3xl hover:opacity-75 border-b rounded-lg"><IoMdArrowBack /></button>
                <form onSubmit={handleSubmit} className="w-full h-full flex flex-col justify-between  gap-4">
                    <div className="h-full">
                        <input 
                            type="text"
                            placeholder="Title"
                            className="m-1 w-full h-1/4 text-5xl outline-none block"
                            autoFocus
                            value={FormData.title}
                            onChange={handleChange}
                            name="title"
                            required
                        />
                        <hr />
                        <textarea 
                            placeholder="Tell your story"
                            className="m-1 w-full h-3/4 text-4xl outline-none block"
                            value={FormData.content}
                            onChange={handleChange}
                            name="content"
                            required
                        />
                    </div>
                    <hr />
                    <button className="w-28 p-2 rounded-md bg-gray-400 cursor-pointer" type="submit">Post</button>
                </form>
            </div>
        </>
    )
}

export default AddBlog