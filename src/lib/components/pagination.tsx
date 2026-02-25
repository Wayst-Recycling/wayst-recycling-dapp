import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { cn } from '@/lib/styles/utils';

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const handlePageChange = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  return (
    <div className="flex items-center space-x-2 py-4">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-md border text-xs font-medium transition-colors',
            currentPage === page
              ? 'bg-brand-primary border-brand-primary text-white'
              : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
          )}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
