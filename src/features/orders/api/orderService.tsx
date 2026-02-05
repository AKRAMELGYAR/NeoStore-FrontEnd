import api from "../../../api/axios";


const orderService = {

    createOrder: async (phone: string, address: string, paymentMethod: string) => {
        const token = localStorage.getItem('token');
        return api.post('/order/create',
            {
                phone,
                address,
                paymentMethod
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )
    },

    createPayment: async (orderId: string) => {
        const token = localStorage.getItem('token');
        return api.post('/order/create-payment',
            {
                orderId
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )
    },

    getOrders: async () => {
        const token = localStorage.getItem('token');
        return api.get('/order',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
    }
}

export default orderService