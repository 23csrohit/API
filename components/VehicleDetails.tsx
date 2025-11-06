import React, { useMemo, useState } from 'react';
import { VehicleRecord } from '../types';
import { DownloadIcon, SearchIcon } from './icons';

const mockVehicleRecords: VehicleRecord[] = [
    {
        id: '1',
        registrationNo: 'DL01AB1234',
        ownerName: 'John Doe',
        registeredDate: '15-Jan-2020',
        vehicleClass: 'Motor Car',
        fuelType: 'Petrol',
        makerModel: 'Maruti Suzuki / Swift Dzire',
        fitnessUpto: '14-Jan-2035',
        insuranceUpto: '10-Jan-2025',
        registrationAuthority: 'RTO, New Delhi',
        searchDate: '2024-07-29 14:32:15',
        location: {
            city: 'New Delhi',
            state: 'Delhi',
            pincode: '110001',
            latitude: 28.6139,
            longitude: 77.2090
        }
    },
    {
        id: '2',
        registrationNo: 'MH12CD5678',
        ownerName: 'Priya Sharma',
        registeredDate: '22-Mar-2019',
        vehicleClass: 'Motor Car',
        fuelType: 'Diesel',
        makerModel: 'Hyundai / Creta',
        fitnessUpto: '21-Mar-2034',
        insuranceUpto: '15-Mar-2025',
        registrationAuthority: 'RTO, Mumbai',
        searchDate: '2024-07-29 13:20:45',
        location: {
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400001',
            latitude: 19.0760,
            longitude: 72.8777
        }
    },
    {
        id: '3',
        registrationNo: 'KA03EF9012',
        ownerName: 'Ramesh Kumar',
        registeredDate: '10-Jun-2021',
        vehicleClass: 'Motor Car',
        fuelType: 'Electric',
        makerModel: 'Tata / Nexon EV',
        fitnessUpto: '09-Jun-2036',
        insuranceUpto: '05-Jun-2025',
        registrationAuthority: 'RTO, Bangalore',
        searchDate: '2024-07-28 16:45:30',
        location: {
            city: 'Bangalore',
            state: 'Karnataka',
            pincode: '560001',
            latitude: 12.9716,
            longitude: 77.5946
        }
    },
    {
        id: '4',
        registrationNo: 'TN09GH3456',
        ownerName: 'Lakshmi Nair',
        registeredDate: '05-Aug-2018',
        vehicleClass: 'Motor Car',
        fuelType: 'Petrol',
        makerModel: 'Honda / City',
        fitnessUpto: '04-Aug-2033',
        insuranceUpto: '30-Jul-2024',
        registrationAuthority: 'RTO, Chennai',
        searchDate: '2024-07-27 11:30:20',
        location: {
            city: 'Chennai',
            state: 'Tamil Nadu',
            pincode: '600001',
            latitude: 13.0827,
            longitude: 80.2707
        }
    },
    {
        id: '5',
        registrationNo: 'GJ06IJ7890',
        ownerName: 'Amit Patel',
        registeredDate: '18-Nov-2020',
        vehicleClass: 'Motor Car',
        fuelType: 'CNG',
        makerModel: 'Maruti Suzuki / WagonR',
        fitnessUpto: '17-Nov-2035',
        insuranceUpto: '12-Nov-2025',
        registrationAuthority: 'RTO, Ahmedabad',
        searchDate: '2024-07-26 09:15:10',
        location: {
            city: 'Ahmedabad',
            state: 'Gujarat',
            pincode: '380001',
            latitude: 23.0225,
            longitude: 72.5714
        }
    },
];

const VehicleDetails: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [regNo, setRegNo] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [vehicleRecords, setVehicleRecords] = useState<VehicleRecord[]>(mockVehicleRecords);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filteredRecords = useMemo(() => {
        return vehicleRecords.filter(record => {
            const matchesSearch = 
                record.registrationNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                record.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                record.makerModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
                record.vehicleClass.toLowerCase().includes(searchTerm.toLowerCase()) ||
                record.location?.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                record.location?.state.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesSearch;
        });
    }, [vehicleRecords, searchTerm]);

    const paginatedRecords = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredRecords.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredRecords, currentPage]);

    const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!regNo.trim()) {
            alert('Please enter a vehicle registration number.');
            return;
        }
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            const existingRecord = mockVehicleRecords.find(r => 
                r.registrationNo.toLowerCase() === regNo.trim().toLowerCase()
            );
            
            if (existingRecord) {
                // Check if already exists in records
                const exists = vehicleRecords.some(r => r.id === existingRecord.id);
                if (!exists) {
                    setVehicleRecords(prev => [existingRecord, ...prev]);
                }
            } else {
                // Create a new mock record
                const newRecord: VehicleRecord = {
                    id: Date.now().toString(),
                    registrationNo: regNo.trim().toUpperCase(),
                    ownerName: 'New Owner',
                    registeredDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
                    vehicleClass: 'Motor Car',
                    fuelType: 'Petrol',
                    makerModel: 'Unknown / Unknown',
                    fitnessUpto: 'N/A',
                    insuranceUpto: 'N/A',
                    registrationAuthority: 'RTO',
                    searchDate: new Date().toLocaleString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                    location: {
                        city: 'Unknown',
                        state: 'Unknown',
                        pincode: 'N/A'
                    }
                };
                setVehicleRecords(prev => [newRecord, ...prev]);
            }
            setRegNo('');
            setIsLoading(false);
        }, 1500);
    };

    const exportToCSV = () => {
        const headers = ['Registration No', 'Owner Name', 'Registered Date', 'Vehicle Class', 'Fuel Type', 'Maker / Model', 'Fitness Upto', 'Insurance Upto', 'Registration Authority', 'Location', 'Search Date'];
        const rows = filteredRecords.map(record => [
            record.registrationNo,
            record.ownerName,
            record.registeredDate,
            record.vehicleClass,
            record.fuelType,
            record.makerModel,
            record.fitnessUpto,
            record.insuranceUpto,
            record.registrationAuthority,
            record.location ? `${record.location.city}, ${record.location.state}` : 'N/A',
            record.searchDate
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `vehicle-details-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const getFuelTypeBadge = (fuelType: string) => {
        const colors: Record<string, string> = {
            'Petrol': 'bg-blue-100 text-blue-800',
            'Diesel': 'bg-gray-100 text-gray-800',
            'Electric': 'bg-green-100 text-green-800',
            'CNG': 'bg-purple-100 text-purple-800'
        };
        return colors[fuelType] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-api-blue">Vehicle Details</h1>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">Search and track vehicle information using registration number</p>
                </div>
                <button
                    onClick={exportToCSV}
                    className="flex items-center justify-center space-x-2 bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition-colors text-sm w-full sm:w-auto"
                >
                    <DownloadIcon className="h-5 w-5" />
                    <span>Export CSV</span>
                </button>
            </div>

            {/* Search Form */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200">
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-stretch sm:items-center w-full bg-white rounded-lg border border-gray-300 overflow-hidden gap-2 sm:gap-0">
                    <input
                        type="search"
                        value={regNo}
                        onChange={(e) => setRegNo(e.target.value.toUpperCase())}
                        placeholder="Enter Vehicle Registration Number..."
                        className="flex-1 py-3 pl-4 sm:pl-6 pr-4 text-gray-700 placeholder-gray-500 focus:outline-none text-sm sm:text-base"
                        disabled={isLoading}
                    />
                <button
                    type="submit"
                    className="flex items-center justify-center bg-api-orange hover:bg-api-orange-600 text-white font-bold py-3 px-4 sm:px-8 transition-colors duration-300 disabled:bg-gray-400 text-sm sm:text-base w-full sm:w-auto"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <>
                            <SearchIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                            <span>Search</span>
                        </>
                    )}
                </button>
            </form>
            </div>

            {/* Search Filter */}
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by registration number, owner name, maker/model, city, state..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-api-blue"
                    />
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                    <p className="text-sm text-gray-500">Total Vehicles</p>
                    <p className="text-2xl font-bold text-api-blue mt-1">{filteredRecords.length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                    <p className="text-sm text-gray-500">Searches This Month</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">{vehicleRecords.length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                    <p className="text-sm text-gray-500">Active Records</p>
                    <p className="text-2xl font-bold text-blue-600 mt-1">{filteredRecords.length}</p>
                </div>
            </div>

            {/* Vehicle Records Table */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs sm:text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr>
                                <th scope="col" className="px-3 sm:px-6 py-3">Registration No</th>
                                <th scope="col" className="px-3 sm:px-6 py-3">Owner Name</th>
                                <th scope="col" className="px-3 sm:px-6 py-3 hidden md:table-cell">Location</th>
                                <th scope="col" className="px-3 sm:px-6 py-3 hidden lg:table-cell">Vehicle Class</th>
                                <th scope="col" className="px-3 sm:px-6 py-3">Fuel Type</th>
                                <th scope="col" className="px-3 sm:px-6 py-3 hidden lg:table-cell">Maker / Model</th>
                                <th scope="col" className="px-3 sm:px-6 py-3 hidden md:table-cell">Registered Date</th>
                                <th scope="col" className="px-3 sm:px-6 py-3 hidden lg:table-cell">Insurance Upto</th>
                                <th scope="col" className="px-3 sm:px-6 py-3 hidden xl:table-cell">Search Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedRecords.length > 0 ? (
                                paginatedRecords.map((record) => (
                                    <tr key={record.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 font-medium text-gray-900 font-mono text-xs sm:text-sm whitespace-nowrap">
                                            {record.registrationNo}
                                        </td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{record.ownerName}</td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 hidden md:table-cell">
                                            {record.location ? (
                                                <div className="flex items-center space-x-2">
                                                    <svg className="h-4 w-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    <div>
                                                        <div className="text-xs sm:text-sm font-medium text-gray-900">{record.location.city}</div>
                                                        <div className="text-xs text-gray-500">{record.location.state}</div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 text-xs sm:text-sm">N/A</span>
                                            )}
                                        </td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 hidden lg:table-cell text-xs sm:text-sm">{record.vehicleClass}</td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getFuelTypeBadge(record.fuelType)}`}>
                                                {record.fuelType}
                                            </span>
                                        </td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 hidden lg:table-cell text-xs sm:text-sm">{record.makerModel}</td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 hidden md:table-cell whitespace-nowrap text-xs sm:text-sm">{record.registeredDate}</td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 hidden lg:table-cell whitespace-nowrap text-xs sm:text-sm">{record.insuranceUpto}</td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 hidden xl:table-cell font-mono text-xs text-gray-500 whitespace-nowrap">{record.searchDate}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={9} className="px-4 sm:px-6 py-8 text-center text-gray-500 text-sm">
                                        No vehicle records found. Use the search form above to add a vehicle.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="px-4 sm:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredRecords.length)} of {filteredRecords.length} results
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="px-3 sm:px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-sm"
                            >
                                Previous
                            </button>
                            <span className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-600">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="px-3 sm:px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-sm"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VehicleDetails;
