// TableUsageExample.tsx - Example of how to use the ChildishTable component

import React from 'react';
import Button from '../../../components/ui/button/button'
import { ColumnDef } from '@tanstack/react-table';
import { Star, Trophy, Award, Sparkles } from 'lucide-react';
import {Table} from "../../../components/ui/table/table"
// Example data type for children
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

// Sample data
const sampleChildren: Child[] = [
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

const ChildListPage: React.FC = () => {
  // Define columns with custom rendering
  const columns: ColumnDef<Child, any>[] = [
    {
      accessorKey: 'name',
      header: 'Child Name',
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
                className={`h-full rounded-full transition-all ${
                  progress >= 90
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
      cell: ({ getValue }) => (
        <div className="text-sm">
          <div className="font-medium text-gray-900">{getValue() as string}</div>
        </div>
      ),
    },
    {
      accessorKey: 'lastSession',
      header: 'Last Session',
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
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <Button >View</Button>
          <button className="px-3 py-1.5 bg-white border-2 border-purple-300 text-purple-600 text-xs font-semibold rounded-lg hover:bg-purple-50 transition-all">
            Edit
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Children Management
        </h1>
        <p className="text-gray-600">
          Manage and track all children in your therapy program
        </p>
      </div>

      <Table
        data={sampleChildren}
        columns={columns}
        pageSize={5}
        showSearch={true}
        searchPlaceholder="Search by name, therapist, or therapy type..."
        emptyMessage="No children found! 🌟"
      />

    </>
  );
};

export default ChildListPage;