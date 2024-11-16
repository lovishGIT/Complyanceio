import React, { useEffect, useState } from 'react';
import { DataItem } from '../../types/data';
import Button from './button';
import axios from 'axios';
import { Country } from '../../types/country';

interface DataFormProps {
    data?: DataItem | null;
    onSubmit: (formData: Omit<DataItem, '_id'>) => void;
    onCancel: () => void;
}

const DataForm: React.FC<DataFormProps> = ({
    data,
    onSubmit,
    onCancel,
}) => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [formData, setFormData] = useState<Omit<DataItem, '_id'>>(
        data || { title: '', description: '', country: '' }
    );

    useEffect(() => {
        if (data) {
            setFormData({
                title: data.title,
                description: data.description,
                country: data.country || '',
            });
        } else {
            if (countries.length > 0 && !formData.country) {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    country: countries[0].name,
                }));
            }
        }
    }, [countries, data, formData.country]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:3000/api/country',
                    { withCredentials: true }
                );
                setCountries(response.data.countries || []);
            } catch (error) {
                console.error('Failed to fetch countries:', error);
            }
        };
        fetchCountries();
    }, []);

    return (
        <form
            onSubmit={handleSubmit}
            className="min-w-[400px] space-y-4 bg-white p-6 rounded-lg shadow"
        >
            <div>
                <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            title: e.target.value,
                        })
                    }
                    placeholder="Title"
                    className="mt-1 px-2 py-1 block w-full rounded-md border-[1px] border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                />
            </div>
            <div>
                <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            description: e.target.value,
                        })
                    }
                    placeholder="Description"
                    className="mt-1 px-2 py-1 block w-full rounded-md border-[1px] border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows={3}
                    required
                />
            </div>
            <div>
                <select
                    name="country"
                    value={formData.country}
                    className="mt-1 px-2 py-1 block w-full rounded-md border-[1px] border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            country: e.target.value,
                        })
                    }
                >
                    {countries.map((country: Country) => (
                        <option
                            key={country.name}
                            value={country.name}
                        >
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex justify-end space-x-2">
                <Button
                    variant="secondary"
                    onClick={onCancel}
                    type="button"
                >
                    Cancel
                </Button>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </div>
        </form>
    );
};

export default DataForm;
