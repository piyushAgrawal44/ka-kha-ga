// ChildListPage.tsx - Example with Server-Side Pagination

import React, { useState, useEffect } from 'react';
import { ColumnDef, SortingState } from '@tanstack/react-table';
import { Star, Trophy, Award, Sparkles, Plus } from 'lucide-react';
import { Table } from '../../../components/ui/table/table';
import Button from '../../../components/ui/button/button';
import Input from '../../../components/ui/input/Input';

interface Child {
  id: string;
  name: string;
  age: number;
  therapyType: string;
  progress: number;
  lastSession: string;
  therapist: string;
  status: 'active' | 'inactive' | 'completed';
}

// Mock API response interface
interface ApiResponse {
  data: Child[];
  totalRows: number;
  pageCount: number;
  currentPage: number;
}

const ChildListPage: React.FC = () => {
  const [data, setData] = useState<Child[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalRows, setTotalRows] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [loading, setLoading] = useState(false);

  // Mock API call - Replace with your actual API
  const fetchData = async (page: number, size: number, sort: SortingState) => {
    setLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock data - In reality, this would come from your API
      const allData: Child[] = [
        {
          id: '1',
          name: 'Alex Johnson',
          age: 5,
          therapyType: 'Speech Therapy',
          progress: 85,
          lastSession: '2025-10-18',
          therapist: 'Dr. Sarah Kim',
          status: 'active',
        },
        {
          id: '2',
          name: 'Emma Rodriguez',
          age: 4,
          therapyType: 'Occupational Therapy',
          progress: 92,
          lastSession: '2025-10-17',
          therapist: 'Ms. Jennifer Lee',
          status: 'active',
        },
        {
          id: '3',
          name: 'Sarah Lee',
          age: 6,
          therapyType: 'Speech Therapy',
          progress: 78,
          lastSession: '2025-10-16',
          therapist: 'Dr. Sarah Kim',
          status: 'active',
        },
        {
          id: '4',
          name: 'Michael Chen',
          age: 7,
          therapyType: 'Behavioral Therapy',
          progress: 95,
          lastSession: '2025-10-15',
          therapist: 'Dr. Maria Garcia',
          status: 'completed',
        },
        {
          id: '5',
          name: 'Olivia Smith',
          age: 3,
          therapyType: 'Speech Therapy',
          progress: 65,
          lastSession: '2025-10-14',
          therapist: 'Dr. Sarah Kim',
          status: 'active',
        },
        {
          id: '6',
          name: 'Liam Brown',
          age: 5,
          therapyType: 'Motor Skills',
          progress: 88,
          lastSession: '2025-10-13',
          therapist: 'Ms. Jennifer Lee',
          status: 'active',
        },
        {
          id: '7',
          name: 'Sophia Davis',
          age: 4,
          therapyType: 'Occupational Therapy',
          progress: 72,
          lastSession: '2025-10-12',
          therapist: 'Dr. Maria Garcia',
          status: 'inactive',
        },
        {
          id: '8',
          name: 'Noah Wilson',
          age: 6,
          therapyType: 'Speech Therapy',
          progress: 90,
          lastSession: '2025-10-11',
          therapist: 'Dr. Sarah Kim',
          status: 'active',
        },
        {
          id: '9',
          name: 'Ava Martinez',
          age: 5,
          therapyType: 'Behavioral Therapy',
          progress: 83,
          lastSession: '2025-10-10',
          therapist: 'Dr. Maria Garcia',
          status: 'active',
        },
        {
          id: '10',
          name: 'Ethan Anderson',
          age: 4,
          therapyType: 'Motor Skills',
          progress: 76,
          lastSession: '2025-10-09',
          therapist: 'Ms. Jennifer Lee',
          status: 'active',
        },
      ];

      // Apply sorting (in real API, this would be done server-side)
      let sortedData = [...allData];
      if (sort.length > 0) {
        const { id, desc } = sort[0];
        sortedData.sort((a, b) => {
          const aVal = a[id as keyof Child];
          const bVal = b[id as keyof Child];
          if (aVal < bVal) return desc ? 1 : -1;
          if (aVal > bVal) return desc ? -1 : 1;
          return 0;
        });
      }

      // Paginate (in real API, this would be done server-side)
      const start = page * size;
      const end = start + size;
      const paginatedData = sortedData.slice(start, end);

      // Mock API response
      const response: ApiResponse = {
        data: paginatedData,
        totalRows: allData.length,
        pageCount: Math.ceil(allData.length / size),
        currentPage: page,
      };

      setData(response.data);
      setTotalRows(response.totalRows);
      setPageCount(response.pageCount);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when pagination or sorting changes
  useEffect(() => {
    fetchData(pageIndex, pageSize, sorting);
  }, [pageIndex, pageSize, sorting]);

  // Handle pagination change
  const handlePaginationChange = (newPageIndex: number, newPageSize: number) => {
    setPageIndex(newPageIndex);
    setPageSize(newPageSize);
  };

  // Handle sorting change
  const handleSortingChange = (newSorting: SortingState) => {
    setSorting(newSorting);
    setPageIndex(0); // Reset to first page when sorting changes
  };

  // Define columns
  const columns: ColumnDef<Child, any>[] = [
    {
      accessorKey: 'name',
      header: 'Child Name',
      enableSorting: true,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold shadow-md">
            {row.original.name.charAt(0)}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{row.original.name}</div>
            <div className="text-xs text-gray-500">Age: {row.original.age}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'therapyType',
      header: 'Therapy Type',
      enableSorting: true,
      cell: ({ getValue }) => {
        const type = getValue() as string;
        const colors: Record<string, string> = {
          'Speech Therapy': 'bg-purple-100 text-purple-700 border-purple-300',
          'Occupational Therapy': 'bg-blue-100 text-blue-700 border-blue-300',
          'Behavioral Therapy': 'bg-green-100 text-green-700 border-green-300',
          'Motor Skills': 'bg-pink-100 text-pink-700 border-pink-300',
        };
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${colors[type] || 'bg-gray-100 text-gray-700'}`}>
            {type}
          </span>
        );
      },
    },
    {
      accessorKey: 'progress',
      header: 'Progress',
      enableSorting: true,
      cell: ({ getValue }) => {
        const progress = getValue() as number;
        return (
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-purple-700">{progress}%</span>
              {progress >= 90 && <Trophy className="w-4 h-4 text-yellow-500" />}
              {progress >= 80 && progress < 90 && <Award className="w-4 h-4 text-purple-500" />}
              {progress >= 70 && progress < 80 && <Star className="w-4 h-4 text-blue-500" />}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${progress >= 90
                  ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                  : progress >= 70
                    ? 'bg-gradient-to-r from-purple-400 to-pink-500'
                    : 'bg-gradient-to-r from-yellow-400 to-orange-500'
                  }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'therapist',
      header: 'Therapist',
      enableSorting: true,
      cell: ({ getValue }) => (
        <div className="text-sm">
          <div className="font-medium text-gray-900">{getValue() as string}</div>
        </div>
      ),
    },
    {
      accessorKey: 'lastSession',
      header: 'Last Session',
      enableSorting: true,
      cell: ({ getValue }) => {
        const date = new Date(getValue() as string);
        return (
          <div className="text-sm">
            <div className="font-medium text-gray-900">
              {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
            <div className="text-xs text-gray-500">{date.getFullYear()}</div>
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      enableSorting: true,
      cell: ({ getValue }) => {
        const status = getValue() as string;
        const statusConfig = {
          active: {
            bg: 'bg-green-100',
            text: 'text-green-700',
            border: 'border-green-300',
            icon: <Sparkles className="w-3 h-3" />,
            label: 'Active',
          },
          inactive: {
            bg: 'bg-gray-100',
            text: 'text-gray-700',
            border: 'border-gray-300',
            icon: <Star className="w-3 h-3" />,
            label: 'Inactive',
          },
          completed: {
            bg: 'bg-yellow-100',
            text: 'text-yellow-700',
            border: 'border-yellow-300',
            icon: <Trophy className="w-3 h-3" />,
            label: 'Completed',
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
      id: 'actions',
      header: 'Actions',
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <Button variant="gradient" size="xs">View</Button>
          <Button variant="outline" size="xs">Edit</Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className='flex justify-between items-center'>
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Children Management
          </h1>
          <p className="text-gray-600">
            Manage and track all children in your therapy program
          </p>
        </div>
        <div className='flex gap-2'>
          <Button icon={Plus}>New Child</Button>
          <Input type='search' placeholder='Search...' />
        </div>

      </div>

      <Table
        data={data}
        columns={columns}
        pageIndex={pageIndex}
        pageSize={pageSize}
        pageCount={pageCount}
        totalRows={totalRows}
        sorting={sorting}
        onPaginationChange={handlePaginationChange}
        onSortingChange={handleSortingChange}
        pageSizeOptions={[5, 10, 20, 50]}
        emptyMessage="No children found! 🌟"
        loading={loading}
      />
    </>
  );
};

export default ChildListPage;