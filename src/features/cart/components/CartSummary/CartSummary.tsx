import { useCart } from '../../hooks/useCart';
import type { CartItem } from '../../../../shared/types';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function CartSummary() {
    const { data: cartData, isLoading: loading } = useCart();
    const items = cartData?.products || [];
    const totalAmount = cartData?.subTotal || 0;
    const navigate = useNavigate()

    const itemCount = items.reduce((count: number, item: CartItem) => count + item.quantity, 0);
    const shippingFee = totalAmount > 500 ? 0 : 50;
    const finalTotal = totalAmount + shippingFee;

    const handleCheckout = () => {
        toast.success('Proceeding to checkout...', {
            icon: '🛒',
        });
        // Future: Navigate to checkout page
        navigate("/checkout")
    };

    return (
        <div className="
      bg-white 
      rounded-2xl 
      shadow-lg 
      overflow-hidden 
      border border-gray-100
      sticky top-4
    ">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-800 to-primary-900 px-6 py-4">
                <h2 className="text-white font-semibold flex items-center gap-2">
                    <i className="fa-solid fa-receipt"></i>
                    Order Summary
                </h2>
            </div>

            {/* Summary Content */}
            <div className="p-6 space-y-4">
                {/* Items Count */}
                <div className="flex justify-between items-center text-gray-600">
                    <span className="flex items-center gap-2">
                        <i className="fa-solid fa-boxes-stacked text-sm"></i>
                        Items ({itemCount})
                    </span>
                    <span className="font-medium text-gray-900">
                        EGP {totalAmount.toLocaleString()}
                    </span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between items-center text-gray-600">
                    <span className="flex items-center gap-2">
                        <i className="fa-solid fa-truck text-sm"></i>
                        Shipping
                    </span>
                    {shippingFee === 0 ? (
                        <span className="font-medium text-primary-800 flex items-center gap-1">
                            <i className="fa-solid fa-gift text-xs"></i>
                            FREE
                        </span>
                    ) : (
                        <span className="font-medium text-gray-900">
                            EGP {shippingFee}
                        </span>
                    )}
                </div>

                {/* Free Shipping Progress */}
                {shippingFee > 0 && (
                    <div className="
            bg-gradient-to-r from-yellow-50 to-orange-50 
            border border-yellow-200 
            rounded-xl 
            p-4
          ">
                        <p className="text-sm text-gray-700 mb-2 flex items-center gap-2">
                            <i className="fa-solid fa-gift text-yellow-500"></i>
                            Add <span className="font-bold text-primary-800">EGP {(500 - totalAmount).toLocaleString()}</span> more for free shipping!
                        </p>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-primary-500 to-primary-700 rounded-full transition-all duration-500"
                                style={{ width: `${Math.min((totalAmount / 500) * 100, 100)}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                {/* Divider */}
                <div className="border-t border-dashed border-gray-200 my-4"></div>

                {/* Total */}
                <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">
                            EGP {finalTotal.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">Including VAT</p>
                    </div>
                </div>

                {/* Checkout Button */}
                <button
                    onClick={handleCheckout}
                    disabled={loading || items.length === 0}
                    className="
            w-full 
            mt-6
            py-4 
            bg-gradient-to-r from-gray-900 to-gray-800
            hover:from-primary-800 hover:to-primary-900
            text-white 
            font-semibold 
            rounded-xl
            shadow-lg shadow-gray-900/20
            hover:shadow-xl hover:shadow-primary-800/30
            hover:-translate-y-0.5
            disabled:opacity-50 
            disabled:hover:translate-y-0
            disabled:cursor-not-allowed
            transition-all duration-300
            flex items-center justify-center gap-3
          "
                >
                    <i className="fa-solid fa-lock"></i>
                    Secure Checkout
                    <i className="fa-solid fa-arrow-right"></i>
                </button>

                {/* Trust Badges */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-center gap-4 text-gray-400 text-sm">
                        <div className="flex items-center gap-1">
                            <i className="fa-solid fa-shield-halved"></i>
                            <span className="text-xs">Secure</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <i className="fa-solid fa-rotate-left"></i>
                            <span className="text-xs">Easy Returns</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <i className="fa-solid fa-truck-fast"></i>
                            <span className="text-xs">Fast Delivery</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
