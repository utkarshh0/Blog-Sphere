import React from 'react';

interface LabelledInputProps {
    label: string;
    type: string;
    placeholder: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string; // Make sure error is optional
}

const LabelledInput: React.FC<LabelledInputProps> = ({
    label,
    type,
    placeholder,
    name,
    value,
    onChange,
    error
}) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : ''}`}
            />
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
    );
};

export default LabelledInput;
