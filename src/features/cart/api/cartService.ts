import api from '../../../api/axios';

const cartService = {
    /**
     * Get the current user's cart
     */
    getCart: async () => {
        const token = localStorage.getItem('token');
        return api.get(`/cart`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },

    /**
     * Add a product to cart
     */
    addToCart: async (productId: string, quantity: number = 1) => {
        const token = localStorage.getItem('token');
        return api.post(
            '/cart/add',
            { productId, quantity },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    },

    /**
     * Remove a product from cart
     */
    removeFromCart: async (productId: string) => {
        const token = localStorage.getItem('token');
        return api.patch(
            '/cart/remove',
            { productId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    },

    /**
     * Update product quantity in cart
     */
    updateCartQuantity: async (productId: string, quantity: number) => {
        const token = localStorage.getItem('token');
        return api.patch(
            '/cart/update',
            { productId, quantity },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    },
};

export default cartService;
