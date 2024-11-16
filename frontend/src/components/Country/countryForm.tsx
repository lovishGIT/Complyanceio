import React, { useState } from 'react';
import { Country } from '../../types/country';

interface CountryFormProps {
    initialData?: Country;
    onSubmit: (data: Country) => void;
    onCancel: () => void;
}

const CountryForm: React.FC<CountryFormProps> = ({
    onSubmit,
    initialData = {
        _id: '',
        name: '',
        code: '',
        population: 0,
        region: '',
        image: '',
    },
    onCancel,
}) => {
    const [formData, setFormData] = useState<Country>(initialData);
    const [file, setFile] = useState<File | null>(null); // For handling file input

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;

        if (type === 'file') {
            setFile(e.target.files?.[0] || null);
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]:
                    name === 'population'
                        ? parseInt(value) || 0
                        : value,
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const dataToSubmit = {
            ...formData,
            image: file, // Attach the file to form data
        };
        onSubmit(dataToSubmit);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md"
        >
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country Code
                    </label>
                    <input
                        type="text"
                        name="code"
                        value={formData.code || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Population
                    </label>
                    <input
                        type="number"
                        name="population"
                        value={formData.population || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Region
                    </label>
                    <input
                        type="text"
                        name="region"
                        value={formData.region || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Flag Image
                    </label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        accept=".png, .jpg, .jpeg"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
            </div>
            <div className="mt-4 flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default CountryForm;
