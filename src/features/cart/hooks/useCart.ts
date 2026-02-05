
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import cartService from '../api/cartService';
import type { CartResponse } from '../../../shared/types';

export const useCart = () => {
    return useQuery<CartResponse>({
        queryKey: ['cart'],
        queryFn: async () => {
            const response = await cartService.getCart();
            return response.data;
        },
    });
};

export const useAddToCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ productId, quantity }: { productId: string; quantity?: number }) =>
            await cartService.addToCart(productId, quantity),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });
};

export const useRemoveFromCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (productId: string) => cartService.removeFromCart(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });
};

export const useUpdateCartQuantity = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
            cartService.updateCartQuantity(productId, quantity),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });
};
