
import { useQuery } from '@tanstack/react-query';
import productService from '../api/productService';
import type { Product } from '../../../shared/types';

export const useProduct = (productId: string | undefined) => {
    return useQuery<Product>({
        queryKey: ['product', productId],
        queryFn: async () => {
            if (!productId) throw new Error('Product ID is required');
            const response = await productService.getProductById(productId);
            return response.data;
        },
        enabled: !!productId,
    });
};
