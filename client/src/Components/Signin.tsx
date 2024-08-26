import { useState } from "react";
import LabelledInput from "./LabelledInput";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface SigninProps {
    onClick: (value: boolean) => void;
}

interface FormErrorProps {
    email?: string;
    password?: string;
}

interface ErrorResponse {
    error?: string;
}

const Signin: React.FC<SigninProps> = ({ onClick }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [formError, setFormError] = useState<FormErrorProps>({});
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();

    const validate = () => {
        const newErrors: FormErrorProps = {};

        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid Email is required';
        if (!formData.password || formData.password.length < 6) newErrors.password = 'Password is required and should be greater than or equal to 6';

        setFormError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await axios.post(`http://localhost:3000/user/signin`, {
                    email: formData.email,
                    password: formData.password
                });
                localStorage.setItem('token', `Bearer ${response.data.token}`);
                navigate('/blog');
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
        <> api/v1/
            <div className="h-full w-full flex flex-col justify-center items-center">
                <div className="w-2/4">
                    <p className="text-3xl font-bold text-center py-3">Login</p>
                    <form onSubmit={handleSubmit} className="flex flex-col">
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
                        <button type="submit" className="w-full border p-1 rounded-lg bg-black text-white mt-4 hover:opacity-75 font-medium">Signin</button>
                    </form>
                    <p className="text-sm p-1">Create an account? <button onClick={() => onClick(false)} className="underline font-bold">Signup</button></p>
                </div>
            </div> 
        </>
    );
};

export default Signin;
