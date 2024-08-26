import { useState } from "react";
import LabelledInput from "./LabelledInput";
import axios, { AxiosError } from "axios";

interface SignupProps {
    onClick: (value: boolean) => void;
}

interface FormData {
    username: string;
    email: string;
    password: string;
}

interface FormErrorProps {
    username?: string;
    email?: string;
    password?: string;
}

interface ErrorResponse {
    error?: string;
}

const Signup: React.FC<SignupProps> = ({ onClick }) => {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: ''
    });
    const [formError, setFormError] = useState<FormErrorProps>({});
    const [serverError, setServerError] = useState('');

    const validate = (): boolean => {
        const newErrors: FormErrorProps = {};

        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid Email is required';
        if (!formData.password || formData.password.length < 6) newErrors.password = 'Password should be greater than or equal to 6 characters';

        setFormError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            try {
                await axios.post('https://blog-sphere-noql.onrender.com/user/signup', formData);
                onClick(true);
                setFormData({
                    username: '',
                    email: '',
                    password: ''
                });
            } catch (error) {
                const axiosError = error as AxiosError<ErrorResponse>;
                setServerError(axiosError.response?.data?.error || 'Something went wrong. Please try again.');
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));

        setFormError(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));

        setServerError('');
    };

    return (
        <>  
            <div className="h-full w-full flex flex-col justify-center items-center">
                <div className="w-2/4">
                    <p className="text-3xl font-bold text-center py-3">Create an account</p>
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <LabelledInput 
                            label="Username" 
                            type="text"
                            placeholder="Enter your name"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            error={formError.username}
                        />
                        <LabelledInput 
                            label="Email" 
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            error={formError.email}
                        />
                        <LabelledInput 
                            label="Password" 
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            error={formError.password}
                        />
                        {serverError && (
                            <p className="text-red-500 text-sm text-center mb-4">{serverError}</p>
                        )}
                        <button type="submit" className="w-full border p-1 rounded-lg bg-black text-white mt-4 hover:opacity-75">
                            Signup
                        </button>
                    </form>
                    <p className="text-sm float-right p-1">
                        Already have an account? 
                        <button onClick={() => onClick(true)} className="underline font-bold">
                            Login
                        </button>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Signup;
