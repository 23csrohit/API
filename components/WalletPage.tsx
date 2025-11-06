import React, { useMemo, useState } from 'react';
import { Payment } from '../types';
import { DownloadIcon, SearchIcon } from './icons';

const mockPayments: Payment[] = [
  { id: '1', date: '2024-07-29', amount: 50.00, status: 'Completed', transactionId: 'txn_1HjK9mN2pQrS3tUvWxYaBcD' },
  { id: '2', date: '2024-07-20', amount: 50.00, status: 'Completed', transactionId: 'txn_1GfE8kL1oPqR2sTvUwXyZaBc' },
  { id: '3', date: '2024-06-15', amount: 25.00, status: 'Completed', transactionId: 'txn_1FeD7jK0nOpQ1rSuTvWxYzAb' },
  { id: '4', date: '2024-05-18', amount: 100.00, status: 'Completed', transactionId: 'txn_1EdC6iJ9mNoP0qRtSuVwXyZa' },
  { id: '5', date: '2024-04-22', amount: 50.00, status: 'Completed', transactionId: 'txn_1DcB5hI8lMnO9pQsRtUvWxYz' },
  { id: '6', date: '2024-03-10', amount: 75.00, status: 'Completed', transactionId: 'txn_1CbA4gH7kLmN8oPrQsStUvWx' },
  { id: '7', date: '2024-02-15', amount: 30.00, status: 'Pending', transactionId: 'txn_1BaZ3fG6jKlM7nOqPrRsStUv' },
  { id: '8', date: '2024-01-20', amount: 50.00, status: 'Failed', transactionId: 'txn_1AzY2eF5iJkL6mNpOqQsRtSu' },
];

const WalletPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'All' | 'Completed' | 'Pending' | 'Failed'>('All');
    const [rechargeAmount, setRechargeAmount] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filteredPayments = useMemo(() => {
        return mockPayments.filter(payment => {
            const matchesSearch = 
                payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                payment.date.includes(searchTerm);
            const matchesStatus = statusFilter === 'All' || payment.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [searchTerm, statusFilter]);

    const paginatedPayments = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredPayments.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredPayments, currentPage]);

    const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

    const getStatusBadge = (status: 'Completed' | 'Pending' | 'Failed') => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Failed': return 'bg-red-100 text-red-800';
        }
    };

    const handleRecharge = (e: React.FormEvent) => {
        e.preventDefault();
        if (!rechargeAmount || parseFloat(rechargeAmount) <= 0) {
            alert('Please enter a valid amount');
            return;
        }
        alert(`Redirecting to payment gateway for $${rechargeAmount}...`);
        setRechargeAmount('');
    };

    const exportToCSV = () => {
        const headers = ['Date', 'Amount (USD)', 'Status', 'Transaction ID'];
        const rows = filteredPayments.map(payment => [
            payment.date,
            payment.amount.toFixed(2),
            payment.status,
            payment.transactionId
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `payment-history-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const stats = useMemo(() => {
        const totalSpent = filteredPayments
            .filter(p => p.status === 'Completed')
            .reduce((sum, p) => sum + p.amount, 0);
        const pending = filteredPayments
            .filter(p => p.status === 'Pending')
            .reduce((sum, p) => sum + p.amount, 0);
        const totalTransactions = filteredPayments.length;
        return { totalSpent, pending, totalTransactions };
    }, [filteredPayments]);

    const currentBalance = 98.50;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-api-blue">Wallet & Billing</h1>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage your wallet balance and payment history</p>
                </div>
                <button
                    onClick={exportToCSV}
                    className="flex items-center justify-center space-x-2 bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition-colors text-sm w-full sm:w-auto"
                >
                    <DownloadIcon className="h-5 w-5" />
                    <span>Export History</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Wallet Card */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-gradient-to-br from-api-blue to-api-blue-800 p-6 rounded-lg shadow-lg text-white">
                        <p className="text-lg font-medium opacity-90">Current Balance</p>
                        <p className="text-5xl font-bold my-4">${currentBalance.toFixed(2)}</p>
                        <p className="text-sm opacity-75">Last recharge: July 20, 2024</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <h2 className="text-xl font-semibold text-api-blue-800 mb-4">Recharge Wallet</h2>
                        <form onSubmit={handleRecharge} className="space-y-4">
                            <div>
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">Amount (USD)</label>
                                <input 
                                    type="number" 
                                    id="amount" 
                                    placeholder="e.g., 50" 
                                    value={rechargeAmount}
                                    onChange={(e) => setRechargeAmount(e.target.value)}
                                    min="1"
                                    step="0.01"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-api-blue" 
                                />
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <button 
                                    type="button"
                                    onClick={() => setRechargeAmount('25')}
                                    className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                    $25
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setRechargeAmount('50')}
                                    className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                    $50
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setRechargeAmount('100')}
                                    className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                    $100
                                </button>
                            </div>
                            <button 
                                type="submit" 
                                className="w-full bg-api-orange text-white font-bold py-3 rounded-md hover:bg-api-orange-600 transition-colors"
                            >
                                Proceed to Payment
                            </button>
                        </form>
                    </div>

                    {/* Stats */}
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <h3 className="text-lg font-semibold text-api-blue-800 mb-4">Statistics</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Total Spent</span>
                                <span className="font-medium text-gray-900">${stats.totalSpent.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Pending</span>
                                <span className="font-medium text-yellow-600">${stats.pending.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Total Transactions</span>
                                <span className="font-medium text-gray-900">{stats.totalTransactions}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment History */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-api-blue-800">Payment History</h2>
                    </div>

                    {/* Filters */}
                    <div className="mb-4 flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 w-full">
                            <div className="relative">
                                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by transaction ID or date..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-api-blue text-sm sm:text-base"
                                />
                            </div>
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value as 'All' | 'Completed' | 'Pending' | 'Failed');
                                setCurrentPage(1);
                            }}
                            className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-api-blue text-sm sm:text-base min-w-[140px]"
                        >
                            <option value="All">All Status</option>
                            <option value="Completed">Completed</option>
                            <option value="Pending">Pending</option>
                            <option value="Failed">Failed</option>
                        </select>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-xs sm:text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                <tr>
                                    <th scope="col" className="px-3 sm:px-6 py-3">Date</th>
                                    <th scope="col" className="px-3 sm:px-6 py-3 text-right">Amount</th>
                                    <th scope="col" className="px-3 sm:px-6 py-3 text-center">Status</th>
                                    <th scope="col" className="px-3 sm:px-6 py-3 hidden md:table-cell">Transaction ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedPayments.length > 0 ? (
                                    paginatedPayments.map((payment) => (
                                        <tr key={payment.id} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm">{new Date(payment.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-right font-medium text-gray-800 text-xs sm:text-sm">${payment.amount.toFixed(2)}</td>
                                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                                                <span className={`px-2 py-1 font-semibold text-xs rounded-full ${getStatusBadge(payment.status)}`}>
                                                    {payment.status}
                                                </span>
                                            </td>
                                            <td className="px-3 sm:px-6 py-3 sm:py-4 font-mono text-xs hidden md:table-cell">{payment.transactionId}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-4 sm:px-6 py-8 text-center text-gray-500 text-sm">
                                            No payments found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredPayments.length)} of {filteredPayments.length} results
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
        </div>
    );
};

export default WalletPage;
