interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  
  export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
    return (
      <nav aria-label="Page navigation example" className="mt-4">
        <ul className="flex items-center -space-x-px h-10 text-base">
          <li>
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
            >
              <span className="sr-only">Previous</span>
              <svg className="w-3 h-3" viewBox="0 0 6 10" fill="none">
                <path d="M5 1L1 5l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </li>
  
          {pages.map((page) => (
            <li key={page}>
              <button
                onClick={() => onPageChange(page)}
                className={`flex items-center justify-center px-4 h-10 leading-tight border ${
                  page === currentPage
                    ? "z-10 text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100"
                    : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                {page}
              </button>
            </li>
          ))}
  
          <li>
            <button
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
            >
              <span className="sr-only">Next</span>
              <svg className="w-3 h-3" viewBox="0 0 6 10" fill="none">
                <path d="M1 9l4-4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    );
  }
  