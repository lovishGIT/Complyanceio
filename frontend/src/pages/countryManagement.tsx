import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Country } from '../types/country';
import CountryForm from '../components/Country/countryForm';
import CountryRow from '../components/Country/countryRow';

const CountryManagement: React.FC = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [formVisible, setFormVisible] = useState(false);

    const [isEditing, setIsEditing] = useState<Country | null>(null);

    useEffect(() => {
        fetchCountries();
    }, []);

    useEffect(() => {
        if (isEditing !== null) {
            setFormVisible(true);
        }
    }, [isEditing, setIsEditing]);

    const fetchCountries = async () => {
        try {
            const response = await axios.get(
                'https://complyanceio.onrender.com/api/country',
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            setCountries(response.data.countries || []);
        } catch (err) {
            console.error('Error fetching countries:', err);
        }
    };

    const handleAddCountry = async (countryData: Country) => {
        try {
            const response = await axios.post(
                'https://complyanceio.onrender.com/api/country/add',
                countryData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true,
                }
            );
            const newCountry = {
                ...response.data.country,
                image: response.data.country.image.url,
            };
            setCountries((prev) => [...prev, newCountry]);
            setFormVisible(false);
        } catch (err) {
            console.error('Error adding country:', err);
        }
    };

    const handleDeleteCountry = async (id: string) => {
        try {
            await axios.delete(
                `https://complyanceio.onrender.com/api/country/${id}`,
                {
                    withCredentials: true,
                }
            );
            setCountries((prev) =>
                prev.filter((country) => country._id !== id)
            );
        } catch (err) {
            console.error('Error deleting country:', err);
        }
    };

    const handleEditCountry = async (
        updatedData: Partial<Country>
    ) => {
        try {
            const response = await axios.patch(
                `https://complyanceio.onrender.com/api/country/${updatedData._id}`,
                updatedData,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );

            const newCountry = {
                ...response.data.country,
                image: response.data.country.image.url,
            };
            setCountries((prev) =>
                prev.map((country) =>
                    country._id === updatedData._id
                        ? newCountry
                        : country
                )
            );
            setIsEditing(null);
            setFormVisible(false);
        } catch (err) {
            console.error('Error editing country:', err);
        }
    };

    return (
        <div className="text-center flex flex-col gap-[5vh] justify-center items-center">
            <div className="flex gap-4">
                <h1 className="text-4xl underline">
                    Country Management
                </h1>
                <button
                    onClick={() => setFormVisible(!formVisible)}
                    className="mb-4 h-10 w-10 text-blue-500 hover:text-white hover:bg-blue-500 rounded-md text-4xl flex justify-center items-center text-center border-[2px] border-solid border-black hover:border-none"
                >
                    {formVisible ? '-' : '+'}
                </button>
            </div>
            {formVisible && (
                <CountryForm
                    initialData={
                        isEditing !== null ? isEditing : undefined
                    }
                    onSubmit={
                        isEditing !== null
                            ? handleEditCountry
                            : handleAddCountry
                    }
                    onCancel={() => {
                        setIsEditing(null);
                        setFormVisible(false);
                    }}
                />
            )}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Population</th>
                        <th>Region</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {countries.map((country) => (
                        <CountryRow
                            key={country._id}
                            country={country}
                            onDelete={handleDeleteCountry}
                            isEditing={isEditing}
                            setIsEditing={setIsEditing}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CountryManagement;
