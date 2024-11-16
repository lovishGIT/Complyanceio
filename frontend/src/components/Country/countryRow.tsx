import React from 'react';
import { Country } from '../../types/country';

interface CountryRowProps {
    country: Country;
    onDelete: (_id: string) => void;
    isEditing: Country | null;
    setIsEditing: (isEditing: Country) => void;
}

const CountryRow: React.FC<CountryRowProps> = ({
    country,
    onDelete,
    isEditing,
    setIsEditing,
}) => {
    return (
        <tr>
            <td className="">
                <a href={typeof country.image === 'string' ? country.image : (country.image && 'url' in country.image ? country.image.url : '#')} target="_blank">
                    link
                </a>
            </td>
            <td className="px-6 py-4">{country.name}</td>
            <td className="px-6 py-4">{country.code}</td>
            <td className="px-6 py-4">
                {country.population.toLocaleString()}
            </td>
            <td className="px-6 py-4">{country.region}</td>
            <td className="px-6 py-4 text-right">
                <button
                    onClick={() => {
                        setIsEditing(country);
                    }}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                >
                    {isEditing ? 'Done' : 'Edit'}
                </button>
                <button
                    onClick={() => onDelete(country._id)}
                    className="text-red-600 hover:text-red-900"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default CountryRow;
