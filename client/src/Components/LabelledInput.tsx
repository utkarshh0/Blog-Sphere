import React from "react";

interface LabelledInputProps{
    label: string,
    type: string,
    placeholder: string,
    name: string,
    value: string,
    onChange: (e : React.ChangeEvent<HTMLInputElement>) => void,
    error: string
}

const LabelledInput: React.FC<LabelledInputProps> = ({label, type, placeholder, name, value, onChange, error}) => {

    return(

        <>
            <label className="font-medium p-1">
                {label}
                <input 
                    type={type}
                    placeholder={placeholder}
                    className="block w-full p-1 rounded-lg border"
                    value={value}
                    name={name}
                    onChange={onChange}
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </label>
        </>
    )
}

export default LabelledInput