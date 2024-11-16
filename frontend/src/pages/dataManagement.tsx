import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { isAxiosError } from 'axios';
import DataTable from '../components/DataManagement/dataTable';
import DataForm from '../components/DataManagement/dataForm';
import Button from '../components/DataManagement/button';
import { DataItem } from '../types/data';
import { UserContext } from '../context/UserContext';

const DataManagement: React.FC = () => {
    const { user } = useContext(UserContext);
    const [data, setData] = useState<DataItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingData, setEditingData] = useState<DataItem | null>(
        null
    );
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        fetchData();
        setIsAdmin(user?.role.toLowerCase() === 'admin');
    }, [user, showForm]);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get<DataItem[]>(
                'http://localhost:3000/api/data', {
                    withCredentials: true,
                }
            );
            setData(response.data);
        } catch (err) {
            if (isAxiosError(err)) {
                setError(err.message);
                if (err.response?.status === 401) navigate('/login');
            } else {
                setError('An error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleAdd = async (formData: Omit<DataItem, '_id'>) => {
        try {
            await axios.post(
                'http://localhost:3000/api/data',
                formData,
                {
                    withCredentials: true,
                }
            );
            fetchData();
            setShowForm(false);
        } catch (err) {
            if (isAxiosError(err)) {
                setError(err.message);
                if (err.response?.status === 401) navigate('/login');
            } else {
                setError('An error occurred');
            }
        }
    };

    const handleUpdate = async (formData: Omit<DataItem, '_id'>) => {
        if (!editingData) return;
        try {
            await axios.put(
                `http://localhost:3000/api/data/${editingData._id}`,
                formData, {
                    withCredentials: true,
                }
            );
            fetchData();
            setEditingData(null);
            setShowForm(false);
        } catch (err) {
            if (isAxiosError(err)) {
                setError(err.message);
                if (err.response?.status === 401) navigate('/login');
            } else {
                setError('An error occurred');
            }
        }
    };

    const handleDelete = async (id: string) => {
        if (
            window.confirm(
                'Are you sure you want to delete this item?'
            )
        ) {
            try {
                await axios.delete(
                    `http://localhost:3000/api/data/${id}`, {
                        withCredentials: true,
                    }
                );
                fetchData();
            } catch (err) {
                if (isAxiosError(err)) {
                    setError(err.message);
                    if (err.response?.status === 401)
                        navigate('/login');
                } else {
                    setError('An error occurred');
                }
            }
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="px-4 py-8 w-full h-full flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold mb-4 flex items-center gap-4">
                Data Management
                {isAdmin && showForm ? (
                    <Button
                        variant="primary"
                        onClick={() => setShowForm(false)}
                    >
                        -
                    </Button>
                ) : (
                    <Button
                        variant="primary"
                        onClick={() => setShowForm(true)}
                    >
                        +
                    </Button>
                )}
            </h1>
            {error && <div className="text-red-500">{error}</div>}
            {showForm && (
                <DataForm
                    data={editingData}
                    onSubmit={editingData ? handleUpdate : handleAdd}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingData(null);
                    }}
                />
            )}
            {!showForm && (
                <>
                    <DataTable
                        data={data}
                        isAdmin={isAdmin}
                        onEdit={(item) => {
                            setEditingData(item);
                            setShowForm(true);
                        }}
                        onDelete={handleDelete}
                    />
                </>
            )}
        </div>
    );
};

export default DataManagement;
