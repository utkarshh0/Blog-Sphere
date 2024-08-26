import Avatar from "react-avatar";

interface blogCardProps{        
    onClick: () => void,
    blog: {
        _id: string,
        author: string,
        createdAt: Date,
        title: string,
        content: string
    }
}
const BlogCard: React.FC<blogCardProps> = ({blog, onClick}) => {

    return (    
        <div onClick={() => onClick(false)} className="border-b py-2 px-2 w md:py-8 md:px-10 hover:bg-[#F3F4F6]">
            <div className="flex items-center gap-2">
                <Avatar className="rounded-full" size="25" name={blog.author} />
                <p>{blog.author}</p>
                <p className="text-sm font-thin">{new Date(blog.createdAt).toLocaleDateString()}</p>
            </div>
            <p className="line-clamp-2 my-3 text-2xl font-extrabold">{blog.title}</p>
            <p className="line-clamp-2">{blog.content}</p>
        </div>
    );
};

export default BlogCard;
