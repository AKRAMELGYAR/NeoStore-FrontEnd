import { useCart } from '../../hooks/useCart';
import CartItem from '../../components/CartItem/CartItem';
import CartSummary from '../../components/CartSummary/CartSummary';
import Loader from '../../../../components/Loader/Loader';

export default function CartPage() {
    const { data: cartData, isLoading: loading, error: queryError } = useCart();
    const items = cartData?.products || [];
    const error = queryError instanceof Error ? queryError.message : queryError ? String(queryError) : null;

    if (loading && items.length === 0) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    Shopping Cart
                </h1>
                <p className="text-gray-600">
                    {items.length > 0
                        ? `You have ${items.length} item${items.length > 1 ? 's' : ''} in your cart`
                        : 'Your cart is waiting to be filled'}
                </p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 flex items-center gap-2">
                        <i className="fa-solid fa-circle-exclamation"></i>
                        {error}
                    </p>
                </div>
            )}

            {items.length === 0 ? (
                /* Empty Cart State */
                <div className="flex flex-col items-center justify-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-inner">
                    <div className="relative mb-6">
                        <div className="w-32 h-32 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center shadow-lg">
                            <i className="fa-solid fa-cart-shopping text-5xl text-primary-700 animate-pulse"></i>
                        </div>
                        <div className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center">
                            <i className="fa-solid fa-face-sad-tear text-xl text-gray-400"></i>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
                    <p className="text-gray-500 mb-6 text-center max-w-md">
                        Looks like you haven't added anything to your cart yet.
                        Start shopping to discover amazing products!
                    </p>
                    <a
                        href="/home"
                        className="
              inline-flex items-center gap-2 
              bg-gradient-to-r from-primary-800 to-primary-900 
              text-white 
              px-8 py-3 
              rounded-full 
              font-semibold
              shadow-lg shadow-primary-800/30
              hover:shadow-xl hover:shadow-primary-800/40
              hover:-translate-y-0.5
              transition-all duration-300
            "
                    >
                        <i className="fa-solid fa-bag-shopping"></i>
                        Start Shopping
                    </a>
                </div>
            ) : (
                /* Cart Content */
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                            <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4">
                                <h2 className="text-white font-semibold flex items-center gap-2">
                                    <i className="fa-solid fa-box"></i>
                                    Cart Items
                                </h2>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {items.map((item) => (
                                    <CartItem key={item._id} item={item} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Cart Summary */}
                    <div className="lg:col-span-1">
                        <CartSummary />
                    </div>
                </div>
            )}
        </div>
    );
}
