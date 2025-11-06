import React from 'react';
import { DashboardView } from './DashboardPage';

interface StatCardProps {
    title: string;
    value: string;
    note: string;
    icon: React.ComponentType<{ className?: string }>;
    color: 'blue' | 'green' | 'orange' | 'purple' | 'red';
    trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, note, icon: Icon, color, trend }) => {
    const colorClasses = {
        blue: 'bg-blue-50 border-blue-200 text-blue-600',
        green: 'bg-green-50 border-green-200 text-green-600',
        orange: 'bg-orange-50 border-orange-200 text-orange-600',
        purple: 'bg-purple-50 border-purple-200 text-purple-600',
        red: 'bg-red-50 border-red-200 text-red-600',
    };

    const textColors = {
        blue: 'text-blue-600',
        green: 'text-green-600',
        orange: 'text-orange-600',
        purple: 'text-purple-600',
        red: 'text-red-600',
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
                    <Icon className="h-6 w-6" />
                </div>
                {trend && (
                    <span className={`text-sm font-semibold ${textColors[color]}`}>
                        {trend}
                    </span>
                )}
            </div>
            <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className={`text-2xl sm:text-3xl font-bold ${textColors[color]} mb-1`}>{value}</p>
            <p className="text-xs text-gray-500">{note}</p>
        </div>
    );
};

const ActivityItem: React.FC<{ icon: string; title: string; time: string; status?: 'success' | 'warning' | 'error' }> = ({ 
    icon, 
    title, 
    time, 
    status = 'success' 
}) => {
    const statusColors = {
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        error: 'bg-red-100 text-red-800',
    };

    return (
        <div className="flex items-start space-x-4 py-3 border-b border-gray-100 last:border-0">
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg ${statusColors[status]}`}>
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{title}</p>
                <p className="text-xs text-gray-500 mt-1">{time}</p>
            </div>
    </div>
);
};

interface DashboardOverviewProps {
    setCurrentView: (view: DashboardView) => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ setCurrentView }) => {
    const recentVehicles = [
        { regNo: 'DL01AB1234', owner: 'John Doe', searchedAt: '2 hours ago' },
        { regNo: 'MH12CD5678', owner: 'Priya Sharma', searchedAt: '5 hours ago' },
        { regNo: 'KA03EF9012', owner: 'Ramesh Kumar', searchedAt: '1 day ago' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">Welcome back, Jane! Here's what's happening with your account.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <button
                        onClick={() => setCurrentView('vehicle')}
                        className="bg-api-blue text-white font-semibold py-2 px-4 rounded-lg hover:bg-api-blue-800 transition-colors text-sm w-full sm:w-auto"
                    >
                        Search Vehicle
                    </button>
                    <button
                        onClick={() => setCurrentView('wallet')}
                        className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm w-full sm:w-auto"
                    >
                        Recharge Wallet
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total API Calls"
                    value="45,230"
                    note="Last 30 days"
                    icon={({ className }) => (
                        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    )}
                    color="blue"
                    trend="+15.2%"
                />
                <StatCard
                    title="Wallet Balance"
                    value="$98.50"
                    note="Available for API usage"
                    icon={({ className }) => (
                        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )}
                    color="green"
                />
                <StatCard
                    title="Vehicle Searches"
                    value="127"
                    note="This month"
                    icon={({ className }) => (
                        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    )}
                    color="orange"
                    trend="+8.5%"
                />
                <StatCard
                    title="Active API Keys"
                    value="3"
                    note="1 key expires in 15 days"
                    icon={({ className }) => (
                        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                    )}
                    color="purple"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Recent Activity</h2>
                        <button
                            onClick={() => setCurrentView('logs')}
                            className="text-xs sm:text-sm text-api-blue hover:underline font-medium"
                        >
                            View All
                        </button>
                    </div>
                    <div className="space-y-0">
                        <ActivityItem
                            icon="✓"
                            title="Vehicle search completed: DL01AB1234"
                            time="2 hours ago"
                            status="success"
                        />
                        <ActivityItem
                            icon="💰"
                            title="Wallet recharged: $50.00"
                            time="1 day ago"
                            status="success"
                        />
                        <ActivityItem
                            icon="🔑"
                            title="New API key generated"
                            time="2 days ago"
                            status="success"
                        />
                        <ActivityItem
                            icon="⚠"
                            title="API rate limit warning"
                            time="3 days ago"
                            status="warning"
                        />
                        <ActivityItem
                            icon="📊"
                            title="Monthly usage report generated"
                            time="5 days ago"
                            status="success"
                        />
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
                    <div className="space-y-3">
                        <button
                            onClick={() => setCurrentView('vehicle')}
                            className="w-full flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left group"
                        >
                            <div className="p-2 bg-blue-500 rounded-lg group-hover:bg-blue-600 transition-colors">
                                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Search Vehicle</p>
                                <p className="text-xs text-gray-500">Lookup vehicle details</p>
                            </div>
                        </button>
                        <button
                            onClick={() => setCurrentView('wallet')}
                            className="w-full flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left group"
                        >
                            <div className="p-2 bg-green-500 rounded-lg group-hover:bg-green-600 transition-colors">
                                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Recharge Wallet</p>
                                <p className="text-xs text-gray-500">Add funds to your account</p>
                            </div>
                        </button>
                        <button
                            onClick={() => setCurrentView('keys')}
                            className="w-full flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left group"
                        >
                            <div className="p-2 bg-purple-500 rounded-lg group-hover:bg-purple-600 transition-colors">
                                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Manage API Keys</p>
                                <p className="text-xs text-gray-500">Create or revoke keys</p>
                            </div>
                        </button>
                        <button
                            onClick={() => setCurrentView('logs')}
                            className="w-full flex items-center space-x-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-left group"
                        >
                            <div className="p-2 bg-orange-500 rounded-lg group-hover:bg-orange-600 transition-colors">
                                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">View API Logs</p>
                                <p className="text-xs text-gray-500">Check request history</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Recent Vehicles & Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Vehicle Searches */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Recent Vehicle Searches</h2>
                        <button
                            onClick={() => setCurrentView('vehicle')}
                            className="text-xs sm:text-sm text-api-blue hover:underline font-medium"
                        >
                            View All
                        </button>
                    </div>
                    <div className="space-y-4">
                        {recentVehicles.map((vehicle, index) => (
                            <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{vehicle.regNo}</p>
                                        <p className="text-xs sm:text-sm text-gray-500 truncate">{vehicle.owner}</p>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{vehicle.searchedAt}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Usage Statistics */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">Usage Statistics</h2>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-700">API Calls Today</span>
                                <span className="text-sm font-semibold text-gray-900">1,245</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">78% of daily limit</p>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-700">Vehicle Searches</span>
                                <span className="text-sm font-semibold text-gray-900">127</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-600 h-2 rounded-full" style={{ width: '63%' }}></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">63% of monthly quota</p>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-700">Wallet Usage</span>
                                <span className="text-sm font-semibold text-gray-900">$1,450.50</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-orange-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">45% of total recharge</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
