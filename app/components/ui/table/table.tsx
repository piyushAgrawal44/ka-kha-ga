// Table.tsx - Fun & Childish themed data table component

import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  SortingState,
  flexRender,
} from '@tanstack/react-table';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Star,
  Sparkles,
  Heart,
  Smile,
} from 'lucide-react';

interface ChildishTableProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  pageSize?: number;
  showSearch?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
}

export function Table<T>({
  data,
  columns,
  pageSize = 10,
  emptyMessage = 'No data found',
}: ChildishTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const pageSizeOptions = [5, 10, 20, 50];

  // Fun decorative stars for the table
  const decorativeStars = [
    { top: '10%', left: '5%', delay: '0s', size: 'w-4 h-4' },
    { top: '20%', right: '8%', delay: '0.5s', size: 'w-3 h-3' },
    { top: '50%', left: '3%', delay: '1s', size: 'w-5 h-5' },
    { top: '70%', right: '5%', delay: '1.5s', size: 'w-4 h-4' },
    { top: '85%', left: '7%', delay: '2s', size: 'w-3 h-3' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-purple-200 relative">
      {/* Decorative Background Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        {decorativeStars.map((star, idx) => (
          <Star
            key={idx}
            className={`absolute ${star.size} text-yellow-400 animate-pulse`}
            style={{
              top: star.top,
              left: star.left,
              right: star.right,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

     

      {/* Table Container */}
      <div className="overflow-x-auto relative">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gradient-to-r from-purple-100 to-pink-100">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-4 text-left relative"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={`flex items-center space-x-2 font-bold text-purple-800 ${
                          header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                        }`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <span className="text-sm sm:text-base">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </span>
                        {header.column.getCanSort() && (
                          <div className="flex flex-col">
                            {header.column.getIsSorted() === 'asc' ? (
                              <ArrowUp className="w-4 h-4 text-purple-600" />
                            ) : header.column.getIsSorted() === 'desc' ? (
                              <ArrowDown className="w-4 h-4 text-purple-600" />
                            ) : (
                              <ArrowUpDown className="w-4 h-4 text-gray-400" />
                            )}
                          </div>
                        )}
                      </div>
                    )}
                    {/* Decorative bottom border */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-pink-400"></div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-12"
                >
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                        <Star className="w-10 h-10 text-purple-400" />
                      </div>
                      <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" />
                    </div>
                    <p className="text-gray-500 text-lg font-medium">{emptyMessage}</p>
                    <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
                  </div>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`border-b border-purple-100 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200 ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-purple-25'
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-4 text-gray-700 text-sm sm:text-base">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-4 border-t-2 border-purple-200">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          {/* Page Size Selector */}
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-purple-800 flex items-center">
             
              Show
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="border-2 border-purple-300 rounded-lg px-3 py-1.5 bg-white text-purple-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer shadow-sm"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span className="text-sm font-medium text-purple-800">entries of total {table.getFilteredRowModel().rows.length} results</span>
          </div>

          {/* Page Info with Go to Page */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <div className="flex items-center space-x-2 text-sm font-medium text-purple-800 bg-white px-4 py-2 rounded-full shadow-sm border-2 border-purple-200">
              <Heart className="w-4 h-4 text-pink-500" />
              <span>
                Page {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount()}
              </span>
              <Sparkles className="w-4 h-4 text-yellow-500" />
            </div>
            
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="p-2 rounded-lg bg-white border-2 border-purple-300 text-purple-600 hover:bg-purple-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
            >
              <ChevronsLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
             <input
                type="text"
                min="1"
                max={table.getPageCount()}
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  if (page >= 0 && page < table.getPageCount()) {
                    table.setPageIndex(page);
                  }
                }}
                className="w-14 px-2 py-2 text-sm text-center border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-semibold text-purple-700"
              />
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="p-2 rounded-lg bg-white border-2 border-purple-300 text-purple-600 hover:bg-purple-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
            >
              <ChevronsRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="h-2 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-300"></div>
    </div>
  );
}

export default Table;