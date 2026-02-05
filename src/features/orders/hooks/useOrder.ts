import { useQuery } from "@tanstack/react-query"
import orderService from "../api/orderService"


export const useOrders = () => {
    return useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await orderService.getOrders()
            return res
        }
    })
}