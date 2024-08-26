import { useState } from "react";

interface EditBlogModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: {
        title: string;
        content: string;
    };
    onSave: (updatedData: { title: string; content: string }) => void;
}

const EditBlogModal: React.FC<EditBlogModalProps> = ({ isOpen, onClose, data, onSave }) => {
    const [title, setTitle] = useState(data.title);
    const [content, setContent] = useState(data.content);

    const handleSave = () => {
        onSave({ title, content });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-3/4">
                <h2 className="text-2xl font-bold mb-4">Edit Blog Post</h2>
                <input
                    className="w-full p-2 mb-4 border rounded-lg"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="w-full p-2 mb-4 border rounded-lg h-40"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <div className="flex justify-end gap-4">
                    <button className="p-2 bg-gray-300 rounded-lg" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="p-2 bg-blue-500 text-white rounded-lg" onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditBlogModal;
