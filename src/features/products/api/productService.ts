import api from '../../../api/axios';

export interface ProductQueryParams {
    page?: number;
    limit?: number;
    sort?: string;
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    select?: string;
}

export interface ProductsResponse {
    products: any[];
    totalProducts: number;
    totalPages: number;
    currentPage: number;
}

const productService = {
    /**
     * Get all products with optional filtering, sorting, pagination, and field selection
     */
    getProducts: async (params: ProductQueryParams = {}) => {
        const token = localStorage.getItem('token');

        // Build query string
        const queryParams = new URLSearchParams();

        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());
        if (params.sort) queryParams.append('sort', params.sort);
        if (params.category) queryParams.append('category', params.category);
        if (params.brand) queryParams.append('brand', params.brand);
        if (params.minPrice) queryParams.append('minPrice', params.minPrice.toString());
        if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString());
        if (params.search) queryParams.append('name', params.search);
        if (params.select) queryParams.append('select', params.select);

        const queryString = queryParams.toString();
        const url = queryString ? `/product?${queryString}` : '/product';

        return api.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },

    /**
     * Get a single product by ID
     */
    getProductById: async (productId: string) => {
        const token = localStorage.getItem('token');
        return api.get(`/product/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },

    /**
     * Get all categories for filtering
     */
    getCategories: async () => {
        const token = localStorage.getItem('token');
        return api.get('/category', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },

    /**
     * Get all brands for filtering
     */
    getBrands: async () => {
        const token = localStorage.getItem('token');
        return api.get('/brand', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
};

export default productService;
