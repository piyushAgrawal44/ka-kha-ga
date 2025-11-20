
import React, { useState, useEffect } from 'react';
import { ColumnDef, SortingState } from '@tanstack/react-table';
import {
    Star,
    Trophy,
    Award,
    Sparkles,
    Plus,
    CheckCircle,
    XCircle,
    Clock,
    AlertCircle,
    TrendingUp,
    Users,
    Mail,
    Calendar
} from 'lucide-react';
import { Table } from '../../../components/ui/table/table';
import Button from '../../../components/ui/button/button';
import Input from '../../../components/ui/input/Input';
import PageHeader from '../../../components/ui/page-header/page-header';
import { useGetPartnerInvitationsQuery } from '../../../services/parent-invite.service';
import { InvitationListItem, GetInvitationsParams, StatCardProps } from '../../../types/parent-invite.type';
import { toast } from 'react-toastify';

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, gradient }) => {
    return (
        <div className="bg-white rounded-2xl p-4 border-4 border-purple-200 shadow-lg">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs font-semibold text-gray-600 mb-1">{title}</p>
                    <p className="text-2xl font-black text-gray-900">{value}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center text-white shadow-md`}>
                    {icon}
                </div>
            </div>
        </div>
    );
};
const PartnerInvitationsPage: React.FC = () => {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [sorting, setSorting] = useState<SortingState>([
        { id: 'sentAt', desc: true }
    ]);
    const [statusFilter, setStatusFilter] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

    // Build query parameters
    const queryParams: GetInvitationsParams = {
        page: pageIndex + 1,
        limit: pageSize,
        sortBy: sorting[0]?.id as any || 'createdAt',
        sortOrder: sorting[0]?.desc ? 'desc' : 'asc',
        ...(statusFilter && { status: statusFilter as any }),
        ...(searchQuery && { parentName: searchQuery }),
        ...(dateRange.startDate && { startDate: dateRange.startDate }),
        ...(dateRange.endDate && { endDate: dateRange.endDate }),
    };

    // Fetch data using RTK Query
    const { data: response, isLoading, isError, error } = useGetPartnerInvitationsQuery(queryParams);

    const invitations = response?.data?.invitations || [];
    const statistics = response?.data?.statistics;
    const pagination = response?.data?.pagination;

    // Handle pagination change
    const handlePaginationChange = (newPageIndex: number, newPageSize: number) => {
        setPageIndex(newPageIndex);
        setPageSize(newPageSize);
    };

    // Handle sorting change
    const handleSortingChange = (newSorting: SortingState) => {
        setSorting(newSorting);
        setPageIndex(0);
    };

    // Show error toast
    useEffect(() => {
        if (isError) {
            toast.error('Failed to load invitations');
        }
    }, [isError]);

    // Define columns
    const columns: ColumnDef<InvitationListItem, any>[] = [
        {
            accessorKey: 'parentName',
            header: 'Parent Details',
            enableSorting: false,
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                        {row.original.parentName.charAt(0)}
                    </div>
                    <div>
                        <div className="font-semibold text-gray-900">{row.original.parentName}</div>
                        <div className="text-xs text-gray-500">{row.original.parentEmail}</div>
                    </div>
                </div>
            ),
        },
        {
            accessorKey: 'status',
            header: 'Status',
            enableSorting: true,
            cell: ({ getValue, row }) => {
                const status = getValue() as string;
                const isExpired = row.original.isExpired;
                
                if (isExpired) {
                    return (
                        <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold border-2 bg-red-100 text-red-700 border-red-300">
                            <AlertCircle className="w-3 h-3" />
                            <span>Expired</span>
                        </span>
                    );
                }

                const statusConfig = {
                    PENDING: {
                        bg: 'bg-yellow-100',
                        text: 'text-yellow-700',
                        border: 'border-yellow-300',
                        icon: <Clock className="w-3 h-3" />,
                        label: 'Pending',
                    },
                    ACCEPTED: {
                        bg: 'bg-green-100',
                        text: 'text-green-700',
                        border: 'border-green-300',
                        icon: <CheckCircle className="w-3 h-3" />,
                        label: 'Accepted',
                    },
                    REJECTED: {
                        bg: 'bg-red-100',
                        text: 'text-red-700',
                        border: 'border-red-300',
                        icon: <XCircle className="w-3 h-3" />,
                        label: 'Rejected',
                    },
                };
                const config = statusConfig[status as keyof typeof statusConfig];
                return (
                    <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold border-2 ${config.bg} ${config.text} ${config.border}`}>
                        {config.icon}
                        <span>{config.label}</span>
                    </span>
                );
            },
        },
        {
            accessorKey: 'sentAt',
            header: 'Sent Date',
            enableSorting: true,
            cell: ({ getValue }) => {
                const date = new Date(getValue() as string);
                return (
                    <div className="text-sm">
                        <div className="font-medium text-gray-900">
                            {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="text-xs text-gray-500">
                            {date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: 'expiryAt',
            header: 'Expiry',
            enableSorting: true,
            cell: ({ getValue, row }) => {
                const date = new Date(getValue() as string);
                const daysUntil = row.original.daysUntilExpiry;
                const isExpired = row.original.isExpired;
                
                return (
                    <div className="text-sm">
                        <div className="font-medium text-gray-900">
                            {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        {daysUntil !== null && !isExpired && (
                            <div className={`text-xs ${daysUntil <= 1 ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>
                                {daysUntil > 0 ? `${daysUntil} days left` : 'Expires today'}
                            </div>
                        )}
                        {isExpired && (
                            <div className="text-xs text-red-600 font-semibold">Expired</div>
                        )}
                    </div>
                );
            },
        },
        {
            accessorKey: 'parentActionAt',
            header: 'Action Date',
            enableSorting: true,
            cell: ({ getValue }) => {
                const actionDate = getValue() as string | null;
                if (!actionDate) {
                    return <span className="text-xs text-gray-400 italic">No action yet</span>;
                }
                const date = new Date(actionDate);
                return (
                    <div className="text-sm">
                        <div className="font-medium text-gray-900">
                            {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        <div className="text-xs text-gray-500">
                            {date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>
                );
            },
        },
    ];

    return (
        <div className="space-y-6">
            {/* Statistics Cards */}
            {statistics && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                    <StatCard
                        title="Total Invites"
                        value={statistics.total}
                        icon={<Mail className="w-6 h-6" />}
                        gradient="from-purple-400 to-pink-400"
                    />
                    <StatCard
                        title="Pending"
                        value={statistics.pending}
                        icon={<Clock className="w-6 h-6" />}
                        gradient="from-yellow-400 to-orange-400"
                    />
                    <StatCard
                        title="Accepted"
                        value={statistics.accepted}
                        icon={<CheckCircle className="w-6 h-6" />}
                        gradient="from-green-400 to-emerald-400"
                    />
                    <StatCard
                        title="Rejected"
                        value={statistics.rejected}
                        icon={<XCircle className="w-6 h-6" />}
                        gradient="from-red-400 to-rose-400"
                    />
                    <StatCard
                        title="Expired"
                        value={statistics.expired}
                        icon={<AlertCircle className="w-6 h-6" />}
                        gradient="from-gray-400 to-gray-500"
                    />
                    <StatCard
                        title="Acceptance Rate"
                        value={`${statistics.acceptanceRate}%`}
                        icon={<TrendingUp className="w-6 h-6" />}
                        gradient="from-blue-400 to-indigo-400"
                    />
                </div>
            )}

            {/* Header and Filters */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <PageHeader title="Parent Invitations" description="Manage and track all parent invitations" />
                
                <div className="flex flex-wrap gap-2 items-center">
                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setPageIndex(0);
                        }}
                        className="px-4 py-2 border-2 border-purple-300 rounded-full font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="">All Status</option>
                        <option value="PENDING">Pending</option>
                        <option value="ACCEPTED">Accepted</option>
                        <option value="REJECTED">Rejected</option>
                    </select>

                    {/* Search */}
                    <Input
                        type="search"
                        placeholder="Search parent name..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setPageIndex(0);
                        }}
                    />
                </div>
            </div>

            {/* Table */}
            <Table
                data={invitations}
                columns={columns}
                pageIndex={pageIndex}
                pageSize={pageSize}
                pageCount={pagination?.totalPages || 0}
                totalRows={pagination?.totalCount || 0}
                sorting={sorting}
                onPaginationChange={handlePaginationChange}
                onSortingChange={handleSortingChange}
                pageSizeOptions={[5, 10, 20, 50]}
                emptyMessage="No invitations found! 📧"
                loading={isLoading}
            />
        </div>
    );
};


export default PartnerInvitationsPage;