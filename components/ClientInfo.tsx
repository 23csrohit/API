import React, { useState } from 'react';
import { ClientInfo as ClientInfoType } from '../types';

const mockClientInfo: ClientInfoType = {
    id: '1',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+91 98765 43210',
    company: 'Tech Solutions Pvt Ltd',
    registrationDate: '2024-01-15',
    accountType: 'Pro',
    apiKeysCount: 3,
    totalApiCalls: 45230,
    walletBalance: 98.50,
    address: '123 Business Park, Sector 5',
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    pincode: '110001',
    gstin: '07AABCU9603R1ZM',
    pan: 'AABCU9603R'
};

const ClientInfo: React.FC = () => {
    const [clientInfo, setClientInfo] = useState<ClientInfoType>(mockClientInfo);
    const [isEditing, setIsEditing] = useState(false);
    const [editedInfo, setEditedInfo] = useState<ClientInfoType>(mockClientInfo);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedInfo({ ...clientInfo });
    };

    const handleSave = () => {
        setClientInfo(editedInfo);
        setIsEditing(false);
        alert('Profile updated successfully!');
    };

    const handleCancel = () => {
        setEditedInfo({ ...clientInfo });
        setIsEditing(false);
    };

    const handleChange = (field: keyof ClientInfoType, value: string | number) => {
        setEditedInfo(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const InfoRow: React.FC<{ label: string; value: string | number; field?: keyof ClientInfoType; editable?: boolean }> = ({ 
        label, 
        value, 
        field, 
        editable = false 
    }) => (
        <div className="py-4 border-b border-gray-200">
            <dt className="text-sm font-medium text-gray-500 mb-1">{label}</dt>
            <dd className="text-base text-gray-900">
                {isEditing && editable && field ? (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => handleChange(field, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-api-blue"
                    />
                ) : (
                    <span>{value}</span>
                )}
            </dd>
        </div>
    );

    const getAccountTypeBadge = (type: string) => {
        const colors = {
            'Free': 'bg-gray-100 text-gray-800',
            'Pro': 'bg-blue-100 text-blue-800',
            'Enterprise': 'bg-purple-100 text-purple-800'
        };
        return colors[type as keyof typeof colors] || colors.Free;
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-api-blue">Client Information</h1>
                    <p className="text-gray-600 mt-1">Manage your account details and preferences</p>
                </div>
                {!isEditing ? (
                    <button
                        onClick={handleEdit}
                        className="bg-api-blue text-white font-semibold py-2 px-6 rounded-md hover:bg-api-blue-800 transition-colors"
                    >
                        Edit Profile
                    </button>
                ) : (
                    <div className="space-x-3">
                        <button
                            onClick={handleCancel}
                            className="bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-md hover:bg-gray-300 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="bg-green-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-green-700 transition-colors"
                        >
                            Save Changes
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center">
                        <img 
                            src="https://i.pravatar.cc/120" 
                            alt="Profile" 
                            className="h-32 w-32 rounded-full mx-auto mb-4 border-4 border-api-orange"
                        />
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">{clientInfo.name}</h2>
                        <p className="text-gray-600 mb-3">{clientInfo.email}</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getAccountTypeBadge(clientInfo.accountType)}`}>
                            {clientInfo.accountType} Plan
                        </span>
                        <div className="mt-6 space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Member Since</span>
                                <span className="font-medium">{new Date(clientInfo.registrationDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">API Keys</span>
                                <span className="font-medium">{clientInfo.apiKeysCount}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Total API Calls</span>
                                <span className="font-medium">{clientInfo.totalApiCalls.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Wallet Balance</span>
                                <span className="font-medium text-green-600">${clientInfo.walletBalance.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-2xl font-semibold text-api-blue-800 mb-6 pb-2 border-b">Personal Information</h2>
                    <dl className="space-y-0">
                        <InfoRow label="Full Name" value={isEditing ? editedInfo.name : clientInfo.name} field="name" editable />
                        <InfoRow label="Email Address" value={isEditing ? editedInfo.email : clientInfo.email} field="email" editable />
                        <InfoRow label="Phone Number" value={isEditing ? editedInfo.phone : clientInfo.phone} field="phone" editable />
                        <InfoRow label="Company Name" value={isEditing ? editedInfo.company : clientInfo.company} field="company" editable />
                    </dl>

                    <h2 className="text-2xl font-semibold text-api-blue-800 mt-8 mb-6 pb-2 border-b">Address Information</h2>
                    <dl className="space-y-0">
                        <InfoRow label="Address" value={isEditing ? editedInfo.address : clientInfo.address} field="address" editable />
                        <div className="grid grid-cols-2 gap-4 py-4 border-b border-gray-200">
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-1">City</dt>
                                <dd className="text-base text-gray-900">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editedInfo.city}
                                            onChange={(e) => handleChange('city', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-api-blue"
                                        />
                                    ) : (
                                        <span>{clientInfo.city}</span>
                                    )}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-1">State</dt>
                                <dd className="text-base text-gray-900">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editedInfo.state}
                                            onChange={(e) => handleChange('state', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-api-blue"
                                        />
                                    ) : (
                                        <span>{clientInfo.state}</span>
                                    )}
                                </dd>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 py-4 border-b border-gray-200">
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-1">Pincode</dt>
                                <dd className="text-base text-gray-900">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editedInfo.pincode}
                                            onChange={(e) => handleChange('pincode', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-api-blue"
                                        />
                                    ) : (
                                        <span>{clientInfo.pincode}</span>
                                    )}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-1">Country</dt>
                                <dd className="text-base text-gray-900">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editedInfo.country}
                                            onChange={(e) => handleChange('country', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-api-blue"
                                        />
                                    ) : (
                                        <span>{clientInfo.country}</span>
                                    )}
                                </dd>
                            </div>
                        </div>
                    </dl>

                    <h2 className="text-2xl font-semibold text-api-blue-800 mt-8 mb-6 pb-2 border-b">Business Information</h2>
                    <dl className="space-y-0">
                        <InfoRow label="GSTIN" value={clientInfo.gstin || 'Not provided'} field="gstin" editable />
                        <InfoRow label="PAN" value={clientInfo.pan || 'Not provided'} field="pan" editable />
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default ClientInfo;

