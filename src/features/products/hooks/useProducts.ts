
import { useQuery } from '@tanstack/react-query';
import productService from '../api/productService';
import { useAppSelector } from '../../../store/hooks';
import type { ProductsResponse, Category, Brand } from '../../../shared/types';

export const useProducts = () => {
    const { filters, currentPage } = useAppSelector((state) => state.products);

    const queryParams = {
        page: currentPage,
        limit: 12,
        ...filters
    };

    return useQuery<ProductsResponse>({
        queryKey: ['products', queryParams],
        queryFn: async () => {
            const response = await productService.getProducts(queryParams);
            // Handle consistent response structure
            const data = response.data;
            if (Array.isArray(data)) {
                return {
                    products: data,
                    totalProducts: data.length,
                    totalPages: 1,
                    currentPage: 1
                };
            }
            return data;
        },
    });
};

export const useCategories = () => {
    return useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await productService.getCategories();
            const data = response.data;
            return Array.isArray(data) ? data : data.categories || [];
        }
    });
};

export const useBrands = () => {
    return useQuery<Brand[]>({
        queryKey: ['brands'],
        queryFn: async () => {
            const response = await productService.getBrands();
            const data = response.data;
            return Array.isArray(data) ? data : data.brands || [];
        }
    });
};
