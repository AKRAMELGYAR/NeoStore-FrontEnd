import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { setFilters, resetFilters } from '../../store/productSlice';
import { useCategories, useBrands } from '../../hooks/useProducts';

interface ProductFiltersProps {
    onFiltersChange: () => void;
    isMobileOpen?: boolean;
    onMobileClose?: () => void;
}

export default function ProductFilters({ onFiltersChange, isMobileOpen, onMobileClose }: ProductFiltersProps) {
    const dispatch = useAppDispatch();
    const { filters } = useAppSelector((state) => state.products);

    const { data: categories = [], isLoading: categoriesLoading } = useCategories();
    const { data: brands = [], isLoading: brandsLoading } = useBrands();

    const [localMinPrice, setLocalMinPrice] = useState(filters.minPrice?.toString() || '');
    const [localMaxPrice, setLocalMaxPrice] = useState(filters.maxPrice?.toString() || '');

    useEffect(() => {
        setLocalMinPrice(filters.minPrice?.toString() || '');
        setLocalMaxPrice(filters.maxPrice?.toString() || '');
    }, [filters.minPrice, filters.maxPrice]);

    const handleCategoryChange = (categoryId: string) => {
        dispatch(setFilters({ category: categoryId }));
        onFiltersChange();
    };

    const handleBrandChange = (brandId: string) => {
        dispatch(setFilters({ brand: brandId }));
        onFiltersChange();
    };

    const handlePriceApply = () => {
        dispatch(
            setFilters({
                minPrice: localMinPrice ? Number(localMinPrice) : undefined,
                maxPrice: localMaxPrice ? Number(localMaxPrice) : undefined,
            })
        );
        onFiltersChange();
    };

    const handleReset = () => {
        dispatch(resetFilters());
        setLocalMinPrice('');
        setLocalMaxPrice('');
        onFiltersChange();
    };

    const filterContent = (
        <>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <i className="fa-solid fa-sliders text-primary-800"></i>
                    Filters
                </h3>
                <button
                    onClick={handleReset}
                    className="text-sm text-primary-800 hover:text-primary-900 font-medium flex items-center gap-1 transition-colors"
                >
                    <i className="fa-solid fa-rotate-left"></i>
                    Reset
                </button>
            </div>

            {/* Categories */}
            <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <i className="fa-solid fa-tag text-gray-500"></i>
                    Categories
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                    {categoriesLoading ? (
                        <div className="flex items-center gap-2 text-gray-500">
                            <i className="fa-solid fa-spinner fa-spin"></i>
                            Loading...
                        </div>
                    ) : (
                        <>
                            <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group">
                                <input
                                    type="radio"
                                    name="category"
                                    checked={!filters.category}
                                    onChange={() => handleCategoryChange('')}
                                    className="w-4 h-4 text-primary-800 accent-primary-800"
                                />
                                <span className="text-gray-700 group-hover:text-gray-900">All Categories</span>
                            </label>
                            {categories.map((cat) => (
                                <label
                                    key={cat._id}
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
                                >
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={filters.category === cat._id}
                                        onChange={() => handleCategoryChange(cat._id)}
                                        className="w-4 h-4 text-primary-800 accent-primary-800"
                                    />
                                    <span className="text-gray-700 group-hover:text-gray-900">{cat.name}</span>
                                </label>
                            ))}
                        </>
                    )}
                </div>
            </div>

            {/* Brands */}
            <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <i className="fa-solid fa-building text-gray-500"></i>
                    Brands
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                    {brandsLoading ? (
                        <div className="flex items-center gap-2 text-gray-500">
                            <i className="fa-solid fa-spinner fa-spin"></i>
                            Loading...
                        </div>
                    ) : (
                        <>
                            <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group">
                                <input
                                    type="radio"
                                    name="brand"
                                    checked={!filters.brand}
                                    onChange={() => handleBrandChange('')}
                                    className="w-4 h-4 text-primary-800 accent-primary-800"
                                />
                                <span className="text-gray-700 group-hover:text-gray-900">All Brands</span>
                            </label>
                            {brands.map((brand) => (
                                <label
                                    key={brand._id}
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
                                >
                                    <input
                                        type="radio"
                                        name="brand"
                                        checked={filters.brand === brand._id}
                                        onChange={() => handleBrandChange(brand._id)}
                                        className="w-4 h-4 text-primary-800 accent-primary-800"
                                    />
                                    <span className="text-gray-700 group-hover:text-gray-900">{brand.name}</span>
                                </label>
                            ))}
                        </>
                    )}
                </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <i className="fa-solid fa-coins text-gray-500"></i>
                    Price Range
                </h4>
                <div className="space-y-3">
                    <div className="flex gap-2 items-center">
                        <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">EGP</span>
                            <input
                                type="number"
                                placeholder="Min"
                                value={localMinPrice}
                                onChange={(e) => setLocalMinPrice(e.target.value)}
                                className="w-full pl-11 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                            />
                        </div>
                        <span className="text-gray-400">-</span>
                        <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">EGP</span>
                            <input
                                type="number"
                                placeholder="Max"
                                value={localMaxPrice}
                                onChange={(e) => setLocalMaxPrice(e.target.value)}
                                className="w-full pl-11 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                            />
                        </div>
                    </div>
                    <button
                        onClick={handlePriceApply}
                        className="w-full py-2.5 bg-gradient-to-r from-primary-800 to-primary-900 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-primary-800/30 transition-all duration-300"
                    >
                        Apply Price Filter
                    </button>
                </div>
            </div>

            {/* Active Filters Summary */}
            {(filters.category || filters.brand || filters.minPrice || filters.maxPrice) && (
                <div className="pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-2">Active Filters</h4>
                    <div className="flex flex-wrap gap-2">
                        {filters.category && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                                {categories.find((c) => c._id === filters.category)?.name}
                                <button
                                    onClick={() => handleCategoryChange('')}
                                    className="hover:bg-primary-200 rounded-full p-0.5"
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </span>
                        )}
                        {filters.brand && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                                {brands.find((b) => b._id === filters.brand)?.name}
                                <button
                                    onClick={() => handleBrandChange('')}
                                    className="hover:bg-primary-200 rounded-full p-0.5"
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </span>
                        )}
                        {(filters.minPrice || filters.maxPrice) && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                                EGP {filters.minPrice || 0} - {filters.maxPrice || '∞'}
                                <button
                                    onClick={() => {
                                        dispatch(setFilters({ minPrice: undefined, maxPrice: undefined }));
                                        setLocalMinPrice('');
                                        setLocalMaxPrice('');
                                        onFiltersChange();
                                    }}
                                    className="hover:bg-primary-200 rounded-full p-0.5"
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </span>
                        )}
                    </div>
                </div>
            )}
        </>
    );


    return (
        <>
            {/* Desktop Filters */}
            <div className="hidden lg:block sticky top-24 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 h-fit">
                {filterContent}
            </div>

            {/* Mobile Filters Drawer */}
            {isMobileOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        onClick={onMobileClose}
                    ></div>

                    {/* Drawer */}
                    <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white z-50 lg:hidden shadow-2xl overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                                <button
                                    onClick={onMobileClose}
                                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <i className="fa-solid fa-xmark text-xl"></i>
                                </button>
                            </div>
                            {filterContent}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
