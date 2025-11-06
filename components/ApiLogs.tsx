import React, { useMemo, useState } from 'react';
import { ApiLog } from '../types';
import { DownloadIcon, FilterIcon, SearchIcon } from './icons';

const mockLogs: ApiLog[] = [
    { id: '1', timestamp: '2024-07-29 14:32:15', apiName: 'Vahan API', endpoint: '/v1/transport/vehicle/info', status: 'Success', statusCode: 200, latency: 150 },
    { id: '2', timestamp: '2024-07-29 14:31:50', apiName: 'GSTIN API', endpoint: '/v1/finance/gstin/verify', status: 'Success', statusCode: 200, latency: 80 },
    { id: '3', timestamp: '2024-07-29 14:30:05', apiName: 'Aadhaar e-KYC', endpoint: '/v1/kyc/aadhaar', status: 'Failed', statusCode: 401, latency: 45 },
    { id: '4', timestamp: '2024-07-29 14:29:10', apiName: 'DigiLocker API', endpoint: '/v1/digilocker/documents', status: 'Success', statusCode: 200, latency: 220 },
    { id: '5', timestamp: '2024-07-29 14:28:45', apiName: 'UPI API', endpoint: '/v1/upi/payment', status: 'Success', statusCode: 200, latency: 110 },
    { id: '6', timestamp: '2024-07-29 14:28:02', apiName: 'Vahan API', endpoint: '/v1/transport/vehicle/info', status: 'Success', statusCode: 200, latency: 145 },
    { id: '7', timestamp: '2024-07-29 14:27:30', apiName: 'GSTIN API', endpoint: '/v1/finance/gstin/verify', status: 'Failed', statusCode: 500, latency: 500 },
    { id: '8', timestamp: '2024-07-29 13:25:10', apiName: 'Vahan API', endpoint: '/v1/transport/vehicle/info', status: 'Success', statusCode: 200, latency: 135 },
    { id: '9', timestamp: '2024-07-29 13:20:45', apiName: 'PAN Verification', endpoint: '/v1/kyc/pan', status: 'Success', statusCode: 200, latency: 95 },
    { id: '10', timestamp: '2024-07-29 13:15:20', apiName: 'Aadhaar e-KYC', endpoint: '/v1/kyc/aadhaar', status: 'Success', statusCode: 200, latency: 120 },
    { id: '11', timestamp: '2024-07-29 12:10:30', apiName: 'UPI API', endpoint: '/v1/upi/payment', status: 'Failed', statusCode: 400, latency: 65 },
    { id: '12', timestamp: '2024-07-29 11:45:15', apiName: 'GSTIN API', endpoint: '/v1/finance/gstin/verify', status: 'Success', statusCode: 200, latency: 88 },
];

const ApiLogs: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'All' | 'Success' | 'Failed'>('All');
    const [apiFilter, setApiFilter] = useState<string>('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const uniqueApis = useMemo(() => {
        const apis = new Set(mockLogs.map(log => log.apiName));
        return Array.from(apis);
    }, []);

    const filteredLogs = useMemo(() => {
        return mockLogs.filter(log => {
            const matchesSearch = 
                log.apiName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                log.endpoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
                log.timestamp.includes(searchTerm);
            const matchesStatus = statusFilter === 'All' || log.status === statusFilter;
            const matchesApi = apiFilter === 'All' || log.apiName === apiFilter;
            return matchesSearch && matchesStatus && matchesApi;
        });
    }, [searchTerm, statusFilter, apiFilter]);

    const paginatedLogs = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredLogs.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredLogs, currentPage]);

    const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);

    const getStatusBadge = (status: 'Success' | 'Failed') => {
        return status === 'Success'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800';
    };

    const exportToCSV = () => {
        const headers = ['Timestamp', 'API Name', 'Endpoint', 'Status', 'Status Code', 'Latency (ms)'];
        const rows = filteredLogs.map(log => [
            log.timestamp,
            log.apiName,
            log.endpoint,
            log.status,
            log.statusCode.toString(),
            log.latency.toString()
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `api-logs-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const stats = useMemo(() => {
        const total = filteredLogs.length;
        const success = filteredLogs.filter(l => l.status === 'Success').length;
        const failed = filteredLogs.filter(l => l.status === 'Failed').length;
        const avgLatency = filteredLogs.length > 0
            ? Math.round(filteredLogs.reduce((sum, l) => sum + l.latency, 0) / filteredLogs.length)
            : 0;
        return { total, success, failed, avgLatency };
    }, [filteredLogs]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-api-blue">API Hit Logs</h1>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">Monitor and track all your API requests in real-time</p>
                </div>
                <button
                    onClick={exportToCSV}
                    className="flex items-center justify-center space-x-2 bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition-colors text-sm w-full sm:w-auto"
                >
                    <DownloadIcon className="h-5 w-5" />
                    <span>Export CSV</span>
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                    <p className="text-sm text-gray-500">Total Requests</p>
                    <p className="text-2xl font-bold text-api-blue mt-1">{stats.total}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                    <p className="text-sm text-gray-500">Successful</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">{stats.success}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                    <p className="text-sm text-gray-500">Failed</p>
                    <p className="text-2xl font-bold text-red-600 mt-1">{stats.failed}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                    <p className="text-sm text-gray-500">Avg Latency</p>
                    <p className="text-2xl font-bold text-blue-600 mt-1">{stats.avgLatency}ms</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 w-full">
                        <div className="relative">
                            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by API name, endpoint, or timestamp..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-api-blue text-sm sm:text-base"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <FilterIcon className="h-5 w-5 text-gray-400 hidden sm:block" />
                        <select
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value as 'All' | 'Success' | 'Failed');
                                setCurrentPage(1);
                            }}
                            className="flex-1 sm:flex-none px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-api-blue text-sm sm:text-base min-w-[120px]"
                        >
                            <option value="All">All Status</option>
                            <option value="Success">Success</option>
                            <option value="Failed">Failed</option>
                        </select>
                        <select
                            value={apiFilter}
                            onChange={(e) => {
                                setApiFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="flex-1 sm:flex-none px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-api-blue text-sm sm:text-base min-w-[120px]"
                        >
                            <option value="All">All APIs</option>
                            {uniqueApis.map(api => (
                                <option key={api} value={api}>{api}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Logs Table */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs sm:text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr>
                                <th scope="col" className="px-3 sm:px-6 py-3">Timestamp</th>
                                <th scope="col" className="px-3 sm:px-6 py-3">API Name</th>
                                <th scope="col" className="px-3 sm:px-6 py-3 hidden md:table-cell">Endpoint</th>
                                <th scope="col" className="px-3 sm:px-6 py-3 text-center">Status</th>
                                <th scope="col" className="px-3 sm:px-6 py-3 text-center">Code</th>
                                <th scope="col" className="px-3 sm:px-6 py-3 text-right">Latency</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedLogs.length > 0 ? (
                                paginatedLogs.map((log) => (
                                    <tr key={log.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 font-mono text-gray-700 text-xs sm:text-sm whitespace-nowrap">{log.timestamp}</td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 font-medium text-gray-900 text-xs sm:text-sm">{log.apiName}</td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 font-mono text-xs hidden md:table-cell">{log.endpoint}</td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                                            <span className={`px-2 py-1 font-semibold text-xs rounded-full ${getStatusBadge(log.status)}`}>
                                                {log.status}
                                            </span>
                                        </td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm">{log.statusCode}</td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm">{log.latency}ms</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-4 sm:px-6 py-8 text-center text-gray-500 text-sm">
                                        No logs found matching your filters
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
                            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredLogs.length)} of {filteredLogs.length} results
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

export default ApiLogs;
