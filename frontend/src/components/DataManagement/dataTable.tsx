import React from 'react';
import { DataItem } from '../../types/data';
import Button from './button';

interface DataTableProps {
    data: DataItem[];
    isAdmin: boolean;
    onEdit: (item: DataItem) => void;
    onDelete: (id: string) => void;
}

const DataTable: React.FC<DataTableProps> = ({
    data,
    isAdmin,
    onEdit,
    onDelete,
}) => (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        ID
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Title
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Description
                    </th>
                    {isAdmin && (
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Actions
                        </th>
                    )}
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {data.length === 0 ? (
                    <tr>
                        <td
                            colSpan={isAdmin ? 4 : 3}
                            className="px-6 py-4 text-center text-gray-500"
                        >
                            No data available.
                        </td>
                    </tr>
                ) : (
                    data.map((item, index) => (
                        <tr key={item._id || index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {item._id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {item.title}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                {item.description}
                            </td>
                            {isAdmin && (
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                    <Button
                                        variant="secondary"
                                        onClick={() => onEdit(item)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() =>
                                            onDelete(item._id)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </td>
                            )}
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    </div>
);

export default DataTable;
