import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'danger' | 'secondary';
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    variant = 'primary',
    disabled = false,
    type = 'button',
}) => {
    const baseClasses =
        'px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50';
    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        danger: 'bg-red-600 text-white hover:bg-red-700',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    };

    return (
        <button
            type={type}
            className={`${baseClasses} ${variants[variant]}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
