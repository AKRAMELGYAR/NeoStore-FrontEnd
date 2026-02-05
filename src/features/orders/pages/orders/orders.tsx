import toast from 'react-hot-toast';
import Loader from '../../../../components/Loader/Loader';
import OrderCard from '../../components/orderCard';
import { useOrders } from '../../hooks/useOrder';


export default function Orders() {
    const { data, isLoading, error } = useOrders();
    if (isLoading) return <Loader />
    if (error) {
        toast.error(error.message)
    }
    return (
        <>

            <div className="container max-w-7xl mx-auto min-h-screen bg-gray-50 p-6 my-8 rounded-md shadow-md">
                <h1 className="text-2xl font-bold mb-6">My Orders</h1>
                <div className="orders flex flex-col gap-5 items-center justify-center">
                    {data?.data.map((order: any) => (
                        <OrderCard key={order._id} order={order} />
                    ))}


                </div>
            </div>
        </>
    );
}