import { useState } from 'react';
import { useRemoveFromCart, useUpdateCartQuantity } from '../../hooks/useCart';
import type { CartItem as CartItemType } from '../../../../shared/types';
import toast from 'react-hot-toast';

interface CartItemProps {
    item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
    const { mutateAsync: removeItem } = useRemoveFromCart();
    const { mutateAsync: updateQuantity } = useUpdateCartQuantity();
    const [isUpdating, setIsUpdating] = useState(false);

    const handleQuantityChange = async (newQuantity: number) => {
        if (newQuantity < 1 || isUpdating) return;

        setIsUpdating(true);
        try {
            await updateQuantity({
                productId: item.productId._id,
                quantity: newQuantity
            });
            toast.success('Quantity updated');
        } catch (error: any) {
            toast.error(error?.message || 'Failed to update quantity');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleRemove = async () => {
        if (isUpdating) return;

        setIsUpdating(true);
        try {
            await removeItem(item.productId._id);
            toast.success('Item removed from cart');
        } catch (error: any) {
            toast.error(error?.message || 'Failed to remove item');
        } finally {
            setIsUpdating(false);
        }
    };

    const itemTotal = (item.productId?.subPrice || 0) * item.quantity;

    return (
        <div className={`
      p-4 md:p-6 
      flex flex-col sm:flex-row 
      gap-4 
      hover:bg-gray-50 
      transition-colors duration-200
      ${isUpdating ? 'opacity-60 pointer-events-none' : ''}
    `}>
            {/* Product Image */}
            <div className="flex-shrink-0 self-center">
                <div className="
          w-24 h-24 md:w-32 md:h-32 
          rounded-xl 
          overflow-hidden 
          bg-gray-100 
          shadow-md
          ring-1 ring-gray-200
        ">
                    <img
                        src={item.productId?.mainImage?.secure_url || '/placeholder.png'}
                        alt={item.productId?.name || 'Product'}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                </div>
            </div>

            {/* Product Info */}
            <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                    <h3 className="font-semibold text-lg text-gray-900 truncate mb-1">
                        {item.productId?.name || 'Unknown Product'}
                    </h3>
                    <p className="text-primary-800 font-bold text-lg md:text-xl">
                        <span className="text-sm font-normal text-gray-500">EGP </span>
                        {item.productId?.subPrice?.toLocaleString() || 0}
                    </p>
                </div>

                {/* Quantity Controls & Actions */}
                <div className="flex flex-wrap items-center gap-4 mt-4">
                    {/* Quantity Selector */}
                    <div className="
            flex items-center 
            bg-gray-100 
            rounded-full 
            overflow-hidden
            shadow-inner
          ">
                        <button
                            onClick={() => handleQuantityChange(item.quantity - 1)}
                            disabled={item.quantity <= 1 || isUpdating}
                            className="
                w-10 h-10 
                flex items-center justify-center 
                text-gray-600 
                hover:bg-gray-200 
                hover:text-primary-800
                disabled:opacity-40 
                disabled:hover:bg-transparent
                disabled:cursor-not-allowed
                transition-all duration-200
              "
                        >
                            <i className="fa-solid fa-minus text-sm"></i>
                        </button>
                        <span className="
              w-12 
              text-center 
              font-semibold 
              text-gray-900
              select-none
            ">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => handleQuantityChange(item.quantity + 1)}
                            disabled={isUpdating}
                            className="
                w-10 h-10 
                flex items-center justify-center 
                text-gray-600 
                hover:bg-gray-200 
                hover:text-primary-800
                disabled:opacity-40
                disabled:cursor-not-allowed 
                transition-all duration-200
              "
                        >
                            <i className="fa-solid fa-plus text-sm"></i>
                        </button>
                    </div>

                    {/* Remove Button */}
                    <button
                        onClick={handleRemove}
                        disabled={isUpdating}
                        className="
              flex items-center gap-2 
              text-red-500 
              hover:text-white
              hover:bg-red-500
              px-4 py-2
              rounded-full
              border border-red-200
              hover:border-red-500
              transition-all duration-200
              font-medium
              text-sm
            "
                    >
                        <i className="fa-solid fa-trash-can"></i>
                        <span className="hidden sm:inline">Remove</span>
                    </button>
                </div>
            </div>

            {/* Item Total */}
            <div className="
        flex-shrink-0 
        self-center
        text-right
        min-w-[100px]
      ">
                <p className="text-sm text-gray-500 mb-1">Subtotal</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">
                    <span className="text-xs font-normal text-gray-500">EGP </span>
                    {itemTotal.toLocaleString()}
                </p>
            </div>
        </div>
    );
}
