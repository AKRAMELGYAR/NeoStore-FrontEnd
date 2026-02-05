import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { setFilters, setCurrentPage } from '../../store/productSlice';
import { useProducts } from '../../hooks/useProducts';
import Card from '../../components/Card/Card';
import Loader from '../../../../components/Loader/Loader';
import Pagination from '../../../../components/Pagination/Pagination';
import ProductFilters from '../../components/ProductFilters/ProductFilters';

const SORT_OPTIONS = [
    { value: '-createdAt', label: 'Newest First', icon: 'fa-clock' },
    { value: 'createdAt', label: 'Oldest First', icon: 'fa-clock-rotate-left' },
    { value: 'subPrice', label: 'Price: Low to High', icon: 'fa-arrow-up-short-wide' },
    { value: '-subPrice', label: 'Price: High to Low', icon: 'fa-arrow-down-wide-short' },
    { value: 'name', label: 'Name: A to Z', icon: 'fa-arrow-down-a-z' },
    { value: '-name', label: 'Name: Z to A', icon: 'fa-arrow-up-z-a' },
];
const LIMIT_OPTIONS = [12, 24, 36, 48];

export default function ProductsPage() {
    const dispatch = useAppDispatch();

    const { filters, currentPage } = useAppSelector((state) => state.products);

    const { data: productsData, isLoading: loading, error: queryError } = useProducts();
    const error = queryError instanceof Error ? queryError.message : queryError ? String(queryError) : null;

    const products = productsData?.products || [];
    const totalProducts = productsData?.totalProducts || 0;
    const totalPages = productsData?.totalPages || 0;

    const [searchInput, setSearchInput] = useState(filters.search);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [limit, setLimit] = useState(12);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');


    // Handle search with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchInput !== filters.search) {
                dispatch(setFilters({ search: searchInput }));
                dispatch(setCurrentPage(1));
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchInput, dispatch, filters.search]);

    const handleSortChange = (sort: string) => {
        dispatch(setFilters({ sort }));
        dispatch(setCurrentPage(1));
    };

    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleLimitChange = (newLimit: number) => {
        setLimit(newLimit);
        dispatch(setCurrentPage(1));
    };

    const handleFiltersChange = () => {
        dispatch(setCurrentPage(1));
        setMobileFiltersOpen(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Header */}
            <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Explore Products
                        </h1>
                        <p className="text-gray-300 text-lg mb-6">
                            Discover amazing products from our curated collection
                        </p>

                        {/* Search Bar */}
                        <div className="relative max-w-xl">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
                            </div>
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="w-full pl-11 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            />
                            {searchInput && (
                                <button
                                    onClick={() => setSearchInput('')}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    {/* Left Side - Results & Mobile Filter Button */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setMobileFiltersOpen(true)}
                            className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all"
                        >
                            <i className="fa-solid fa-sliders text-primary-800"></i>
                            <span className="font-medium">Filters</span>
                        </button>

                        <div className="text-gray-600">
                            <span className="font-semibold text-gray-900">{totalProducts}</span> products found
                        </div>
                    </div>

                    {/* Right Side - Sort, Limit, View Toggle */}
                    <div className="flex items-center gap-3 flex-wrap">
                        {/* Sort Dropdown */}
                        <div className="relative group">
                            <select
                                value={filters.sort}
                                onChange={(e) => handleSortChange(e.target.value)}
                                className="appearance-none px-4 py-2.5 pr-10 bg-white rounded-xl shadow-md border border-gray-200 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer hover:shadow-lg transition-all"
                            >
                                {SORT_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <i className="fa-solid fa-chevron-down text-gray-400 text-sm"></i>
                            </div>
                        </div>

                        {/* Items per page */}
                        <div className="relative">
                            <select
                                value={limit}
                                onChange={(e) => handleLimitChange(Number(e.target.value))}
                                className="appearance-none px-4 py-2.5 pr-10 bg-white rounded-xl shadow-md border border-gray-200 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer hover:shadow-lg transition-all"
                            >
                                {LIMIT_OPTIONS.map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt} / page
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <i className="fa-solid fa-chevron-down text-gray-400 text-sm"></i>
                            </div>
                        </div>

                        {/* View Mode Toggle */}
                        <div className="hidden sm:flex items-center bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`px-4 py-2.5 transition-all ${viewMode === 'grid'
                                    ? 'bg-primary-800 text-white'
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <i className="fa-solid fa-grid-2"></i>
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`px-4 py-2.5 transition-all ${viewMode === 'list'
                                    ? 'bg-primary-800 text-white'
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <i className="fa-solid fa-list"></i>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex gap-8">
                    {/* Filters Sidebar */}
                    <aside className="hidden lg:block w-72 flex-shrink-0">
                        <ProductFilters
                            onFiltersChange={handleFiltersChange}
                            isMobileOpen={mobileFiltersOpen}
                            onMobileClose={() => setMobileFiltersOpen(false)}
                        />
                    </aside>

                    {/* Mobile Filters */}
                    {mobileFiltersOpen && (
                        <ProductFilters
                            onFiltersChange={handleFiltersChange}
                            isMobileOpen={mobileFiltersOpen}
                            onMobileClose={() => setMobileFiltersOpen(false)}
                        />
                    )}

                    {/* Products Grid */}
                    <main className="flex-1">
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                                <p className="text-red-600 flex items-center gap-2">
                                    <i className="fa-solid fa-circle-exclamation"></i>
                                    {error}
                                </p>
                            </div>
                        )}

                        {loading ? (
                            <div className="flex items-center justify-center py-24">
                                <Loader />
                            </div>
                        ) : products.length === 0 ? (
                            /* Empty State */
                            <div className="flex flex-col items-center justify-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
                                <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mb-6">
                                    <i className="fa-solid fa-box-open text-4xl text-gray-500"></i>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">No products found</h2>
                                <p className="text-gray-500 mb-6 text-center max-w-md">
                                    Try adjusting your search or filter criteria to find what you're looking for.
                                </p>
                            </div>
                        ) : (
                            <>
                                {/* Products Grid */}
                                <div
                                    className={
                                        viewMode === 'grid'
                                            ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6'
                                            : 'space-y-4'
                                    }
                                >
                                    {products.map((product) => (
                                        <Card key={product._id} product={product} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="mt-12 mb-4">
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={handlePageChange}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
