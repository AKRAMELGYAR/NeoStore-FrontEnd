interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const showEllipsis = totalPages > 7;

        if (!showEllipsis) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (currentPage > 3) {
                pages.push('...');
            }

            // Show pages around current
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                if (!pages.includes(i)) {
                    pages.push(i);
                }
            }

            if (currentPage < totalPages - 2) {
                pages.push('...');
            }

            // Always show last page
            if (!pages.includes(totalPages)) {
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const pages = getPageNumbers();

    return (
        <nav className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`
                    flex items-center justify-center gap-1 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-300
                    ${currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-800 shadow-md hover:shadow-lg border border-gray-200'
                    }
                `}
            >
                <i className="fa-solid fa-chevron-left text-sm"></i>
                <span className="hidden sm:inline">Prev</span>
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
                {pages.map((page, index) =>
                    page === '...' ? (
                        <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => onPageChange(page as number)}
                            className={`
                                min-w-[40px] h-10 flex items-center justify-center rounded-lg font-medium transition-all duration-300
                                ${currentPage === page
                                    ? 'bg-gradient-to-r from-primary-800 to-primary-900 text-white shadow-lg shadow-primary-800/30'
                                    : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-800 border border-gray-200 hover:border-primary-300'
                                }
                            `}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`
                    flex items-center justify-center gap-1 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-300
                    ${currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-800 shadow-md hover:shadow-lg border border-gray-200'
                    }
                `}
            >
                <span className="hidden sm:inline">Next</span>
                <i className="fa-solid fa-chevron-right text-sm"></i>
            </button>
        </nav>
    );
}
