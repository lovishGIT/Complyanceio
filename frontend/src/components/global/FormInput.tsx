import React from 'react';

interface FormInputProps {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

const FormInput: React.FC<FormInputProps> = ({
    label,
    type,
    name,
    value,
    onChange,
    placeholder,
}) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block mb-2 font-medium">
                {label}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                placeholder={placeholder}
            />
        </div>
    );
};

export default FormInput;
